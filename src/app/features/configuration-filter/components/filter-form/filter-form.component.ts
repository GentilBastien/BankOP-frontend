import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { FilterFormModel } from './filter-form.model';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { ConfigurationFilterUsecases } from '../../configuration-filter-usecases';
import {
  ConfigurationFilter,
  DEFAULT_CONFIGURATION_FILTER,
  equals,
  isDefaultConfigurationFilter,
} from '../../../../core/entities/configuration-filter/configuration-filter';

@Component({
  selector: 'bankop-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterFormComponent implements OnInit {
  @Input({ required: true }) categories$: Observable<string[]>;
  protected filters$: Observable<ConfigurationFilter>;
  protected savedFilters$: Observable<ConfigurationFilter[]>;
  protected formControlSavedFilters: FormControl<ConfigurationFilter | undefined>;
  protected formGroup: FormGroup<FilterFormModel>;

  constructor(
    private readonly configurationFilterUsecases: ConfigurationFilterUsecases,
    private dialog: MatDialog
  ) {
    this.categories$ = of([]);
    this.filters$ = this.configurationFilterUsecases
      .filtersChanges()
      .pipe(tap((configFilter: ConfigurationFilter) => this.changeFilterFormValue(configFilter)));
    this.savedFilters$ = this.configurationFilterUsecases.configurationFilterChanges();
    this.formControlSavedFilters = new FormControl<ConfigurationFilter | undefined>(undefined, { nonNullable: true });
    this.formGroup = new FormGroup<FilterFormModel>({
      name: new FormControl<string | undefined>(undefined, { nonNullable: true }),
      minDate: new FormControl<Date | undefined>(undefined, { nonNullable: true }),
      maxDate: new FormControl<Date | undefined>(undefined, { nonNullable: true }),
      minPrice: new FormControl<number | undefined>(undefined, { nonNullable: true }),
      maxPrice: new FormControl<number | undefined>(undefined, { nonNullable: true }),
      search: new FormControl<string>('', { nonNullable: true }),
      selectedCategories: new FormControl<string[]>([], { nonNullable: true }),
    });
  }

  public ngOnInit(): void {
    this.configurationFilterUsecases.refreshSavedConfigurationFilters().subscribe();
    this.filters$.subscribe();
    this.formGroup.valueChanges
      .pipe(
        map(() => this.getConfigurationFilterFromForm()),
        tap((configurationFilter: ConfigurationFilter) =>
          this.configurationFilterUsecases.setFilters(configurationFilter)
        )
      )
      .subscribe();
    this.formControlSavedFilters.valueChanges
      .pipe(
        tap((selectedSavedFilters: ConfigurationFilter | undefined) => this.onSaveFilterChange(selectedSavedFilters))
      )
      .subscribe();
  }

  public createSavedFilter(): void {
    this.dialog
      .open(FilterDialogComponent)
      .afterClosed()
      .pipe(
        filter((filterConfigName: string) =>
          this.configurationFilterUsecases.isFilterConfigurationNameValid(filterConfigName)
        ),
        map((filterConfigName: string) => this.getConfigurationFilterFromForm(filterConfigName)),
        switchMap((filterConfig: ConfigurationFilter) =>
          this.configurationFilterUsecases.createConfigurationFilter(filterConfig)
        )
      )
      .subscribe();
  }

  protected deleteSavedFilter(): void {
    const selectedSavedFilter: ConfigurationFilter | undefined = this.formControlSavedFilters.value;
    if (selectedSavedFilter) {
      this.configurationFilterUsecases
        .deleteConfigurationFilter(selectedSavedFilter.id!)
        .pipe(tap(() => this.formControlSavedFilters.reset()))
        .subscribe();
    }
  }

  protected resetFilters($event: MouseEvent): void {
    $event.stopPropagation();
    this.configurationFilterUsecases.setFilters(DEFAULT_CONFIGURATION_FILTER());
    this.formControlSavedFilters.setValue(undefined);
  }

  protected getFormControl<T>(id: string): FormControl<T> {
    return this.formGroup.get(id) as FormControl<T>;
  }

  private getConfigurationFilterFromForm(name?: string): ConfigurationFilter {
    return {
      id: undefined,
      name: name ?? this.formGroup.controls.name.value,
      minDate: this.formGroup.controls.minDate.value,
      maxDate: this.formGroup.controls.maxDate.value,
      minPrice: this.formGroup.controls.minPrice.value,
      maxPrice: this.formGroup.controls.maxPrice.value,
      search: this.formGroup.controls.search.value,
      selectedCategories: this.formGroup.controls.selectedCategories.value,
    };
  }

  private changeFilterFormValue(filters: ConfigurationFilter): void {
    if (!equals(filters, this.getConfigurationFilterFromForm())) {
      this.formGroup.patchValue({
        name: filters.name,
        minDate: filters.minDate,
        maxDate: filters.maxDate,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        search: filters.search,
        selectedCategories: filters.selectedCategories,
      });
    }
  }

  private onSaveFilterChange(selectedSavedFilters: ConfigurationFilter | undefined): void {
    if (!selectedSavedFilters || isDefaultConfigurationFilter(selectedSavedFilters)) {
      this.formGroup.enable();
      this.configurationFilterUsecases.setFilters(DEFAULT_CONFIGURATION_FILTER());
    } else {
      this.formGroup.disable();
      this.configurationFilterUsecases.setFilters(selectedSavedFilters);
    }
  }
}
