import { Injectable } from '@angular/core';
import { ReleveStore } from './releve-store';
import { Observable } from 'rxjs';
import { ReleveRow } from '../../core/entities/releve-operations/releve-row';
import { ConfigurationFilter } from '../../core/entities/configuration-filter/configuration-filter';
import { FilterPredicate } from '../configuration-filter/configuration-filter-predicate';

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

  public filterPredicate: FilterPredicate<ReleveRow> = (row: ReleveRow, filter: ConfigurationFilter) => {
    return (
      row.price >= (filter.minPrice ?? -Infinity) &&
      row.price <= (filter.maxPrice ?? Infinity) &&
      (!filter.minDate ? true : row.date >= filter.minDate) &&
      (!filter.maxDate ? true : row.date <= filter.maxDate) &&
      row.name.toLowerCase().includes(filter.search.toLowerCase()) &&
      (filter.selectedCategories.length == 0 ||
        filter.selectedCategories.some(selectedCategory => selectedCategory === row.path))
    );
  };
}
