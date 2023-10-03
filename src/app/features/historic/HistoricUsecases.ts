import {Injectable} from "@angular/core";
import {HistoricStore} from "./HistoricStore";
import {Observable} from "rxjs";
import {ReleveRow} from "../../core/dtos/releve-operations/ReleveRow";
import {HistoricFilter} from "./HistoricFilter";
import * as _moment from 'moment';
import _rollupMoment from 'moment';

const moment = _rollupMoment || _moment;

@Injectable()
export class HistoricUsecases {
  constructor(private readonly historicStore: HistoricStore) {

  }

  public refreshReleveOperations(): Observable<void> {
    return this.historicStore.refreshReleveOperations();
  }

  public operationsChanges(): Observable<ReleveRow[]> {
    return this.historicStore.operations$;
  }

  public categoriesChanges(): Observable<string[]> {
    return this.historicStore.categories$;
  }

  public filtersChanges(): Observable<HistoricFilter> {
    return this.historicStore.filter$;
  }

  public setFilters(filters: HistoricFilter): void {
    this.historicStore.setFilters(filters);
  }

  public filterOperations(rows: ReleveRow[], filters: HistoricFilter): ReleveRow[] {
    return rows
      .filter(row => row.price >= (filters.minPrice ?? -Infinity))
      .filter(row => row.price <= (filters.maxPrice ?? Infinity))
      .filter(row => moment(row.date).isAfter(filters.minDate ?? moment("0000-01-01")))
      .filter(row => moment(row.date).isBefore(filters.maxDate ?? moment("9999-12-31")))
      .filter(row => row.name.toLowerCase().includes(filters.search.toLowerCase()))
      .filter(row => filters.selectedCategories.length == 0 || filters.selectedCategories.some(selectedCategory => selectedCategory === row.path))
  }
}
