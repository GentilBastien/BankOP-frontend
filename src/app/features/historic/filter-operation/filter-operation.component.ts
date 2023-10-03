import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {Moment} from 'moment';
import {Observable, tap} from "rxjs";
import {DEFAULT_HISTORIC_FILTER, HistoricFilter} from "../HistoricFilter";
import {HistoricUsecases} from "../HistoricUsecases";

@Component({
  selector: 'filter-operation',
  templateUrl: './filter-operation.component.html',
  styleUrls: ['./filter-operation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterOperationComponent implements OnInit {
  protected filters$: Observable<HistoricFilter>;
  protected categories$: Observable<string[]>;
  protected currentFilters: HistoricFilter = DEFAULT_HISTORIC_FILTER();

  constructor(private readonly historicUsecases: HistoricUsecases) {
    this.filters$ = this.historicUsecases.filtersChanges();
    this.categories$ = this.historicUsecases.categoriesChanges();
  }

  public ngOnInit(): void {
    this.filters$.pipe(
      tap(filters => this.currentFilters = filters),
      tap(filters => console.log(filters))
    ).subscribe();
  }

  public resetFilters(): void {
    this.historicUsecases.setFilters(DEFAULT_HISTORIC_FILTER());
  }

  protected startDateChanged($event: Moment): void {
    const historicFilters: HistoricFilter = this.currentFilters;
    historicFilters.minDate = $event;
    this.historicUsecases.setFilters(historicFilters);
  }

  protected endDateChanged($event: Moment): void {
    const historicFilters: HistoricFilter = this.currentFilters;
    historicFilters.maxDate = $event;
    this.historicUsecases.setFilters(historicFilters);
  }

  protected minPriceChanged($event: number | undefined): void {
    const historicFilters: HistoricFilter = this.currentFilters;
    historicFilters.minPrice = $event;
    this.historicUsecases.setFilters(historicFilters);
  }

  protected maxPriceChanged($event: number | undefined): void {
    const historicFilters: HistoricFilter = this.currentFilters;
    historicFilters.maxPrice = $event;
    this.historicUsecases.setFilters(historicFilters);
  }

  protected searchChanged($event: string): void {
    const historicFilters: HistoricFilter = this.currentFilters;
    historicFilters.search = $event;
    this.historicUsecases.setFilters(historicFilters);
  }

  protected categoriesChanged($event: string[]): void {
    const historicFilters: HistoricFilter = this.currentFilters;
    historicFilters.selectedCategories = $event;
    this.historicUsecases.setFilters(historicFilters);
  }
}
