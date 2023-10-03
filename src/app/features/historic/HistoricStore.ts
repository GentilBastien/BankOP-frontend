import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {returnVoid} from "../../shared/custom-operators/ReturnVoid";
import {HistoricService} from "../../core/services/HistoricService";
import {ReleveRow} from "../../core/dtos/releve-operations/ReleveRow";
import {DEFAULT_HISTORIC_FILTER, HistoricFilter} from "./HistoricFilter";

@Injectable()
export class HistoricStore {
  private operationsSubject: BehaviorSubject<ReleveRow[]> = new BehaviorSubject<ReleveRow[]>([]);
  public operations$: Observable<ReleveRow[]> = this.operationsSubject.asObservable();

  private categoriesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public categories$: Observable<string[]> = this.categoriesSubject.asObservable();

  private filterSubject: BehaviorSubject<HistoricFilter> = new BehaviorSubject<HistoricFilter>(DEFAULT_HISTORIC_FILTER());
  public filter$: Observable<HistoricFilter> = this.filterSubject.asObservable();

  constructor(private readonly historicService: HistoricService) {
  }

  public refreshReleveOperations(): Observable<void> {
    return this.historicService.fetch().pipe(
      tap(releveOp => this.operationsSubject.next(releveOp.rows)),
      tap(releveOp => this.categoriesSubject.next(releveOp.categories)),
      returnVoid()
    )
  }

  public setFilters(filters: HistoricFilter): void {
    this.filterSubject.next(filters);
  }
}
