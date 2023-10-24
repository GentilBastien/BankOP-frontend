import { Injectable } from '@angular/core';
import { ReleveStore } from './releve-store';
import { Observable } from 'rxjs';
import { ReleveRowDto } from '../../core/dtos/releve-operations/releve-row.dto';
import { ReleveFilter } from './releve-filter';
import _moment from 'moment';
import _rollupMoment from 'moment';

const moment = _rollupMoment || _moment;

@Injectable()
export class ReleveUsecases {
  constructor(private readonly releveStore: ReleveStore) {}

  public refreshReleveOperations(): Observable<void> {
    return this.releveStore.refreshReleveOperations();
  }

  public operationsChanges(): Observable<ReleveRowDto[]> {
    return this.releveStore.operations$;
  }

  public categoriesChanges(): Observable<string[]> {
    return this.releveStore.categories$;
  }

  public filtersChanges(): Observable<ReleveFilter> {
    return this.releveStore.filter$;
  }

  public savedFiltersChanges(): Observable<ReleveFilter[]> {
    return this.releveStore.savedFilters$;
  }

  //TODO: import this function as callback to the async validator
  public isFilterConfigurationNameValid(value: string): boolean {
    return !!value && value.length > 3;
  }

  public setFilters(filter: ReleveFilter): void {
    this.releveStore.setFilters(filter);
  }

  public addSavedFilter(filter: ReleveFilter): void {
    this.releveStore.addSavedFilter(filter);
  }

  public removeSavedFilter(filter: ReleveFilter): void {
    this.releveStore.removeSavedFilter(filter);
  }

  public filterOperations(rows: ReleveRowDto[], filters: ReleveFilter): ReleveRowDto[] {
    return rows
      .filter(row => row.price >= (filters.minPrice ?? -Infinity))
      .filter(row => row.price <= (filters.maxPrice ?? Infinity))
      .filter(row => moment(row.date).isAfter(filters.minDate ?? moment('0000-01-01')))
      .filter(row => moment(row.date).isBefore(filters.maxDate ?? moment('9999-12-31')))
      .filter(row => row.name.toLowerCase().includes(filters.search.toLowerCase()))
      .filter(
        row =>
          filters.selectedCategories.length == 0 ||
          filters.selectedCategories.some(selectedCategory => selectedCategory === row.path)
      );
  }

  public countSetFilters(filter: ReleveFilter): number {
    let count: number = 0;
    for (const key in filter) {
      const val = filter[key as keyof ReleveFilter];
      if (val && !Array.isArray(val) && key !== 'name') {
        count++;
      }
    }
    return count + filter.selectedCategories.length;
  }
}
