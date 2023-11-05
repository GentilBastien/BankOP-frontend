import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { returnVoid } from '../../shared/custom-operators/ReturnVoid';
import { ReleveService } from '../../core/services/releve.service';
import { ReleveRow } from '../../core/entities/releve-operations/releve-row';
import { ReleveOperation } from '../../core/entities/releve-operations/releve-operation';

@Injectable()
export class ReleveStore {
  private operationsSubject: BehaviorSubject<ReleveRow[]> = new BehaviorSubject<ReleveRow[]>([]);
  public operations$: Observable<ReleveRow[]> = this.operationsSubject.asObservable();

  private categoriesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public categories$: Observable<string[]> = this.categoriesSubject.asObservable();

  constructor(private readonly releveService: ReleveService) {}

  public refreshReleveOperations(): Observable<void> {
    return this.releveService.fetch().pipe(
      tap((releveOp: ReleveOperation) => this.operationsSubject.next(releveOp.rows)),
      tap((releveOp: ReleveOperation) => this.categoriesSubject.next(releveOp.categories)),
      returnVoid()
    );
  }
}
