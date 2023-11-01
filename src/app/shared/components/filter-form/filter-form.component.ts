import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_RELEVE_FILTER, equals, ReleveFilter } from '../../../features/releve/releve-filter';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, map, Observable, of, tap } from 'rxjs';
import { FilterFormModel } from './filter-form.model';
import { MatDialog } from '@angular/material/dialog';
import { ReleveUsecases } from '../../../features/releve/releve-usecases';
import { DialogFilterNameComponent } from '../../../features/releve/filter-operation/dialog-filter-name/dialog-filter-name.component';

@Component({
  selector: 'bankop-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent implements OnInit {
  @Input({ required: true }) filters$: Observable<ReleveFilter>;
  @Input({ required: true }) savedFilters$: Observable<ReleveFilter[]>;
  @Input({ required: true }) categories$: Observable<string[]>;
  @Output() filtersChanged: EventEmitter<ReleveFilter>;
  @Output() filterNameAdded: EventEmitter<string>;
  protected formControlSavedFilters: FormControl<ReleveFilter | undefined>;
  protected formGroup: FormGroup<FilterFormModel>;

  constructor(
    private readonly releveUsecases: ReleveUsecases,
    public dialog: MatDialog
  ) {
    this.filters$ = of(DEFAULT_RELEVE_FILTER());
    this.savedFilters$ = of([]);
    this.categories$ = of([]);
    this.filtersChanged = new EventEmitter<ReleveFilter>();
    this.filterNameAdded = new EventEmitter<string>();
    this.formControlSavedFilters = new FormControl<ReleveFilter | undefined>(undefined, { nonNullable: true });
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
    this.filters$.pipe(tap((releveFilter: ReleveFilter) => this.changeFilterFormValue(releveFilter))).subscribe();
    this.formGroup.valueChanges
      .pipe(
        map(() => this.mapFormToReleveFilters()),
        tap((releveFilter: ReleveFilter) => this.filtersChanged.emit(releveFilter))
      )
      .subscribe();
    this.formControlSavedFilters.valueChanges
      .pipe(
        tap((selectedSavedFilters: ReleveFilter | undefined) => {
          if (!selectedSavedFilters || equals(selectedSavedFilters, DEFAULT_RELEVE_FILTER())) {
            this.formGroup.enable();
            this.releveUsecases.setFilters(DEFAULT_RELEVE_FILTER());
          } else {
            this.formGroup.disable();
            this.releveUsecases.setFilters(selectedSavedFilters);
          }
        })
      )
      .subscribe();
  }

  public createSavedFilter(): void {
    this.dialog
      .open(DialogFilterNameComponent)
      .afterClosed()
      .pipe(
        filter((filterConfigName: string) => this.releveUsecases.isFilterConfigurationNameValid(filterConfigName)),
        map((filterConfigName: string) => this.mapFormToReleveFilters(filterConfigName)),
        tap((releveFilter: ReleveFilter) => this.releveUsecases.createSavedFilter(releveFilter)),
        tap((releveFilter: ReleveFilter) => this.formControlSavedFilters.setValue(releveFilter))
      )
      .subscribe();
  }

  protected deleteSavedFilter(): void {
    const selectedSavedFilter: ReleveFilter | undefined = this.formControlSavedFilters.value;
    if (selectedSavedFilter) {
      this.releveUsecases.removeSavedFilter(selectedSavedFilter);
      this.formControlSavedFilters.reset();
    }
  }

  protected resetFilters($event: MouseEvent): void {
    $event.stopPropagation();
    this.releveUsecases.setFilters(DEFAULT_RELEVE_FILTER());
    this.formControlSavedFilters.setValue(undefined);
  }

  protected getFormControl<T>(id: string): FormControl<T> {
    return this.formGroup.get(id) as FormControl<T>;
  }

  private mapFormToReleveFilters(name?: string): ReleveFilter {
    return {
      name: name ?? this.formGroup.controls.name.value,
      minDate: this.formGroup.controls.minDate.value,
      maxDate: this.formGroup.controls.maxDate.value,
      minPrice: this.formGroup.controls.minPrice.value,
      maxPrice: this.formGroup.controls.maxPrice.value,
      search: this.formGroup.controls.search.value,
      selectedCategories: this.formGroup.controls.selectedCategories.value,
    };
  }

  private changeFilterFormValue(filters: ReleveFilter): void {
    if (!equals(filters, this.mapFormToReleveFilters())) {
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
}
