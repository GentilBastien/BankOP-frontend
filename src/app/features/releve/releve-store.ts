import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { returnVoid } from '../../shared/custom-operators/ReturnVoid';
import { ReleveService } from '../../core/services/releve.service';
import { ReleveRow } from '../../core/dtos/releve-operations/ReleveRow';
import { DEFAULT_HISTORIC_FILTER, ReleveFilter } from './releve-filter';
import { ReleveOperationDto } from '../../core/dtos/releve-operations/ReleveOperationDto';

@Injectable()
export class ReleveStore {
  private operationsSubject: BehaviorSubject<ReleveRow[]> = new BehaviorSubject<ReleveRow[]>([]);
  public operations$: Observable<ReleveRow[]> = this.operationsSubject.asObservable();

  private categoriesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public categories$: Observable<string[]> = this.categoriesSubject.asObservable();

  private filterSubject: BehaviorSubject<ReleveFilter> = new BehaviorSubject<ReleveFilter>(DEFAULT_HISTORIC_FILTER());
  public filter$: Observable<ReleveFilter> = this.filterSubject.asObservable();

  private savedFiltersSubject: BehaviorSubject<ReleveFilter[]> = new BehaviorSubject<ReleveFilter[]>([]);
  public savedFilters$: Observable<ReleveFilter[]> = this.savedFiltersSubject.asObservable();

  constructor(private readonly historicService: ReleveService) {}

  public refreshReleveOperations(): Observable<void> {
    return this.historicService.fetch().pipe(
      tap((releveOp: ReleveOperationDto) => this.operationsSubject.next(releveOp.rows)),
      tap((releveOp: ReleveOperationDto) => this.categoriesSubject.next(releveOp.categories)),
      returnVoid()
    );
  }

  public setFilters(filters: ReleveFilter): void {
    this.filterSubject.next(filters);
  }

  public addSavedFilter(newSavedFilter: ReleveFilter): void {
    const savedFilters: ReleveFilter[] = this.savedFiltersSubject.getValue();
    savedFilters.push(newSavedFilter);
    this.savedFiltersSubject.next(savedFilters);
  }

  public removeSavedFilter(oldSavedFilter: ReleveFilter): void {
    const savedFilters: ReleveFilter[] = this.savedFiltersSubject.getValue();
    savedFilters.splice(savedFilters.indexOf(oldSavedFilter), 1);
    this.savedFiltersSubject.next(savedFilters);
  }
}
