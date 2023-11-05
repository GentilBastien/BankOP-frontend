import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  ConfigurationFilter,
  DEFAULT_CONFIGURATION_FILTER,
} from '../../core/entities/configuration-filter/configuration-filter';
import { ConfigurationFilterService } from '../../core/services/configuration-filter.service';
import { returnVoid } from '../../shared/custom-operators/ReturnVoid';
import { ConfigurationFilterStorageService } from '../../core/services/local-storage/configuration-filter-storage.service';

@Injectable()
export class ConfigurationFilterStore {
  private savedConfigurationFilterSubject: BehaviorSubject<ConfigurationFilter[]> = new BehaviorSubject<
    ConfigurationFilter[]
  >([]);
  public savedConfigurationFilter$: Observable<ConfigurationFilter[]> =
    this.savedConfigurationFilterSubject.asObservable();

  private filterSubject: BehaviorSubject<ConfigurationFilter> = new BehaviorSubject<ConfigurationFilter>(
    this.initReleveFilterFromLocalStorage()
  );
  public filter$: Observable<ConfigurationFilter> = this.filterSubject.asObservable();

  constructor(
    private readonly configurationFilterService: ConfigurationFilterService,
    private readonly configurationFilterStorageService: ConfigurationFilterStorageService
  ) {}

  public refreshSavedConfigurationFilters(): Observable<void> {
    return this.configurationFilterService.fetchAllConfigurationFilters().pipe(
      tap((configFilters: ConfigurationFilter[]) => this.savedConfigurationFilterSubject.next(configFilters)),
      returnVoid()
    );
  }

  public createConfigurationFilter(configurationFilter: ConfigurationFilter): Observable<void> {
    return this.configurationFilterService.createConfigurationFilter(configurationFilter).pipe(returnVoid());
  }

  public deleteConfigurationFilter(id: string): Observable<void> {
    return this.configurationFilterService.deleteConfigurationFilter(id);
  }

  public setFilters(filter: ConfigurationFilter): void {
    this.filterSubject.next(filter);
    this.configurationFilterStorageService.setItem(filter);
  }

  private initReleveFilterFromLocalStorage(): ConfigurationFilter {
    return this.configurationFilterStorageService.getItem(DEFAULT_CONFIGURATION_FILTER());
  }
}
