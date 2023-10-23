import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Moment } from 'moment';
import { filter, map, Observable, tap } from 'rxjs';
import { DEFAULT_HISTORIC_FILTER, ReleveFilter } from '../releve-filter';
import { ReleveUsecases } from '../releve-usecases';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogFilterNameComponent } from './dialog-filter-name/dialog-filter-name.component';

@Component({
  selector: 'filter-operation',
  templateUrl: './filter-operation.component.html',
  styleUrls: ['./filter-operation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterOperationComponent implements OnInit {
  protected filters$: Observable<ReleveFilter>;
  protected categories$: Observable<string[]>;
  protected savedFilters$: Observable<ReleveFilter[]>;
  protected currentFilters: ReleveFilter;
  protected formControlSavedFilters: FormControl<ReleveFilter | undefined>;

  constructor(
    private readonly releveUsecases: ReleveUsecases,
    public dialog: MatDialog
  ) {
    this.filters$ = this.releveUsecases.filtersChanges();
    this.categories$ = this.releveUsecases.categoriesChanges();
    this.savedFilters$ = this.releveUsecases.savedFiltersChanges();
    this.currentFilters = DEFAULT_HISTORIC_FILTER();
    this.formControlSavedFilters = new FormControl<ReleveFilter | undefined>(undefined, { nonNullable: true });
  }

  public ngOnInit(): void {
    this.filters$.pipe(tap(filters => (this.currentFilters = filters))).subscribe();
    this.formControlSavedFilters.valueChanges
      .pipe(
        tap((selectedSavedFilters: ReleveFilter | undefined) =>
          this.releveUsecases.setFilters(selectedSavedFilters ?? DEFAULT_HISTORIC_FILTER())
        )
      )
      .subscribe();
  }

  public addSavedFilter(): void {
    const dialogRef: MatDialogRef<DialogFilterNameComponent> = this.dialog.open(DialogFilterNameComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter((filterConfigName: string) => this.releveUsecases.isFilterConfigurationNameValid(filterConfigName)),
        map((filterConfigName: string) => ({ ...this.currentFilters, name: filterConfigName }) as ReleveFilter),
        tap((newFilters: ReleveFilter) => this.releveUsecases.addSavedFilter(newFilters)),
        tap((newFilters: ReleveFilter) => this.formControlSavedFilters.setValue(newFilters))
      )
      .subscribe();
  }

  public resetFilters(): void {
    this.formControlSavedFilters.reset();
  }

  protected deleteSavedFilter(): void {
    const selectedSavedFilter: ReleveFilter | undefined = this.formControlSavedFilters.value;
    if (selectedSavedFilter) {
      this.releveUsecases.removeSavedFilter(selectedSavedFilter);
      this.formControlSavedFilters.reset();
    }
  }

  protected startDateChanged($event: Moment): void {
    const releveFilter: ReleveFilter = this.currentFilters;
    releveFilter.minDate = $event;
    this.releveUsecases.setFilters(releveFilter);
  }

  protected endDateChanged($event: Moment): void {
    const releveFilter: ReleveFilter = this.currentFilters;
    releveFilter.maxDate = $event;
    this.releveUsecases.setFilters(releveFilter);
  }

  protected minPriceChanged($event: number | undefined): void {
    const releveFilter: ReleveFilter = this.currentFilters;
    releveFilter.minPrice = $event;
    this.releveUsecases.setFilters(releveFilter);
  }

  protected maxPriceChanged($event: number | undefined): void {
    const releveFilter: ReleveFilter = this.currentFilters;
    releveFilter.maxPrice = $event;
    this.releveUsecases.setFilters(releveFilter);
  }

  protected searchChanged($event: string): void {
    const releveFilter: ReleveFilter = this.currentFilters;
    releveFilter.search = $event;
    this.releveUsecases.setFilters(releveFilter);
  }

  protected categoriesChanged($event: string[]): void {
    const releveFilter: ReleveFilter = this.currentFilters;
    releveFilter.selectedCategories = $event;
    this.releveUsecases.setFilters(releveFilter);
  }
}
