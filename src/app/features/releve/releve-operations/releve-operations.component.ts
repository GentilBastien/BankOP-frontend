import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReleveUsecases } from '../releve-usecases';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatestWith, map, Observable, switchMap, tap } from 'rxjs';
import { returnVoid } from '../../../shared/custom-operators/ReturnVoid';
import { MatSort, Sort } from '@angular/material/sort';
import { ReleveRowDto } from '../../../core/dtos/releve-operations/releve-row.dto';
import { MatPaginator } from '@angular/material/paginator';
import { ReleveFilter } from '../releve-filter';
import { FilterOperationComponent } from '../filter-operation/filter-operation.component';

@Component({
  selector: 'app-releve-operations',
  templateUrl: './releve-operations.component.html',
  styleUrls: ['./releve-operations.component.scss'],
})
export class ReleveOperationsComponent implements OnInit, AfterViewInit {
  protected displayedColumns: string[] = ['date', 'name', 'price', 'path'];
  protected dataSource: MatTableDataSource<ReleveRowDto>;
  protected nbCurrentFilters: number = 0;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterOperationComponent') filterOpComponent!: FilterOperationComponent;

  constructor(private readonly historicUsecases: ReleveUsecases) {
    this.dataSource = new MatTableDataSource<ReleveRowDto>();
  }

  public ngOnInit(): void {
    this.historicUsecases
      .refreshReleveOperations()
      .pipe(switchMap(() => this.operationsChanges()))
      .subscribe();
    this.historicUsecases
      .filtersChanges()
      .pipe(
        tap(),
        tap((filters: ReleveFilter) => (this.nbCurrentFilters = this.historicUsecases.countSetFilters(filters)))
      )
      .subscribe();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public operationsChanges(): Observable<void> {
    return this.historicUsecases.operationsChanges().pipe(
      combineLatestWith(this.historicUsecases.filtersChanges()),
      map(([rows, filters]) => this.historicUsecases.filterOperations(rows, filters)),
      tap(rows => (this.dataSource.data = rows)),
      returnVoid()
    );
  }

  protected sortChanged(sortState: Sort): void {
    console.log(sortState.active + ' - ' + sortState.direction);
  }

  protected resetFilters($event: MouseEvent): void {
    $event.stopPropagation();
    this.filterOpComponent.resetFilters();
  }
}
