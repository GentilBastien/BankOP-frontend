import { Injectable } from '@angular/core';
import { ReleveStore } from './releve-store';
import { Observable } from 'rxjs';
import { ReleveFilter } from './releve-filter';
import { ReleveRow } from '../../core/entities/releve-operations/releve-row';

@Injectable()
export class ReleveUsecases {
  constructor(private readonly releveStore: ReleveStore) {}

  public refreshReleveOperations(): Observable<void> {
    return this.releveStore.refreshReleveOperations();
  }

  public operationsChanges(): Observable<ReleveRow[]> {
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

  public createSavedFilter(filter: ReleveFilter): void {
    this.releveStore.createSavedFilter(filter);
  }

  public removeSavedFilter(filter: ReleveFilter): void {
    this.releveStore.removeSavedFilter(filter);
  }

  public filterOperations(rows: ReleveRow[], filters: ReleveFilter): ReleveRow[] {
    return rows
      .filter((row: ReleveRow) => row.price >= (filters.minPrice ?? -Infinity))
      .filter((row: ReleveRow) => row.price <= (filters.maxPrice ?? Infinity))
      .filter((row: ReleveRow) => (!filters.minDate ? true : row.date >= filters.minDate))
      .filter((row: ReleveRow) => (!filters.maxDate ? true : row.date <= filters.maxDate))
      .filter((row: ReleveRow) => row.name.toLowerCase().includes(filters.search.toLowerCase()))
      .filter(
        (row: ReleveRow) =>
          filters.selectedCategories.length == 0 ||
          filters.selectedCategories.some(selectedCategory => selectedCategory === row.path)
      );
  }

  public countSetFilters(filter: ReleveFilter): number {
    let count: number = 0;
    for (const key in filter) {
      const val = filter[key as keyof ReleveFilter];
      if ((val || (!val && val === 0)) && !Array.isArray(val) && key !== 'name') {
        count++;
      }
    }
    return count + filter.selectedCategories.length;
  }
}
