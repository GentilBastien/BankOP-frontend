import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { returnVoid } from '../../shared/custom-operators/ReturnVoid';
import { ReleveService } from '../../core/services/releve.service';
import { DEFAULT_RELEVE_FILTER, ReleveFilter } from './releve-filter';
import { ReleveFilterStorageService } from '../../core/services/local-storage/releve-filter-storage.service';
import { ReleveRow } from '../../core/entities/releve-operations/releve-row';
import { ReleveOperation } from '../../core/entities/releve-operations/releve-operation';

@Injectable()
export class ReleveStore {
  private operationsSubject: BehaviorSubject<ReleveRow[]> = new BehaviorSubject<ReleveRow[]>([]);
  public operations$: Observable<ReleveRow[]> = this.operationsSubject.asObservable();

  private categoriesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public categories$: Observable<string[]> = this.categoriesSubject.asObservable();

  private filterSubject: BehaviorSubject<ReleveFilter> = new BehaviorSubject<ReleveFilter>(
    this.initReleveFilterFromLocalStorage()
  );
  public filter$: Observable<ReleveFilter> = this.filterSubject.asObservable();

  private savedFiltersSubject: BehaviorSubject<ReleveFilter[]> = new BehaviorSubject<ReleveFilter[]>([]);
  public savedFilters$: Observable<ReleveFilter[]> = this.savedFiltersSubject.asObservable();

  constructor(
    private readonly releveService: ReleveService,
    private readonly releveFilterStorageService: ReleveFilterStorageService
  ) {}

  private initReleveFilterFromLocalStorage(): ReleveFilter {
    return this.releveFilterStorageService.getItem(DEFAULT_RELEVE_FILTER());
  }

  public refreshReleveOperations(): Observable<void> {
    return this.releveService.fetch().pipe(
      tap((releveOp: ReleveOperation) => this.operationsSubject.next(releveOp.rows)),
      tap((releveOp: ReleveOperation) => this.categoriesSubject.next(releveOp.categories)),
      returnVoid()
    );
  }

  public setFilters(filter: ReleveFilter): void {
    this.filterSubject.next(filter);
    this.releveFilterStorageService.setItem(filter);
  }

  public removeSavedFilter(oldSavedFilter: ReleveFilter): void {
    const savedFilters: ReleveFilter[] = this.savedFiltersSubject.getValue();
    savedFilters.splice(savedFilters.indexOf(oldSavedFilter), 1);
    this.savedFiltersSubject.next(savedFilters);
  }

  public createSavedFilter(filter: ReleveFilter): void {
    const savedFilters: ReleveFilter[] = this.savedFiltersSubject.getValue();
    savedFilters.push(filter);
    this.savedFiltersSubject.next(savedFilters);
  }
}
