import { Injectable } from '@angular/core';
import { ConfigurationFilterStore } from './configuration-filter-store';
import { map, Observable, switchMap } from 'rxjs';
import { ConfigurationFilter } from '../../core/entities/configuration-filter/configuration-filter';
import { FilterPredicate } from './configuration-filter-predicate';

@Injectable()
export class ConfigurationFilterUsecases {
  constructor(private readonly configurationFilterStore: ConfigurationFilterStore) {}

  public configurationFilterChanges(): Observable<ConfigurationFilter[]> {
    return this.configurationFilterStore.savedConfigurationFilter$;
  }

  public filtersChanges(): Observable<ConfigurationFilter> {
    return this.configurationFilterStore.filter$;
  }

  //TODO: import this function as callback to the async validator
  public isFilterConfigurationNameValid(value: string): boolean {
    return !!value && value.length > 3;
  }

  public setFilters(filter: ConfigurationFilter): void {
    this.configurationFilterStore.setFilters(filter);
  }

  public refreshSavedConfigurationFilters(): Observable<void> {
    return this.configurationFilterStore.refreshSavedConfigurationFilters();
  }

  public createConfigurationFilter(configurationFilter: ConfigurationFilter): Observable<void> {
    return this.configurationFilterStore
      .createConfigurationFilter(configurationFilter)
      .pipe(switchMap(() => this.refreshSavedConfigurationFilters()));
  }

  public deleteConfigurationFilter(id: number): Observable<void> {
    return this.configurationFilterStore
      .deleteConfigurationFilter(id.toString())
      .pipe(switchMap(() => this.refreshSavedConfigurationFilters()));
  }

  public filterWithPredicate<T>(listToFilter: T[], filterPredicate: FilterPredicate<T>): Observable<T[]> {
    return this.filtersChanges().pipe(
      map((filter: ConfigurationFilter) => listToFilter.filter((elem: T) => filterPredicate(elem, filter)))
    );
  }

  public countSetFilters(): Observable<number> {
    const count = (filter: ConfigurationFilter): number => {
      let count: number = 0;
      for (const key in filter) {
        const val = filter[key as keyof ConfigurationFilter];
        if ((val || (!val && val === 0)) && !Array.isArray(val) && key !== 'name' && key !== 'id') {
          count++;
        }
      }
      return count + filter.selectedCategories.length;
    };
    return this.filtersChanges().pipe(map((filter: ConfigurationFilter) => count(filter)));
  }
}
