import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReleveUsecases } from '../releve-usecases';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatestWith, map, Observable, switchMap, tap } from 'rxjs';
import { returnVoid } from '../../../shared/custom-operators/ReturnVoid';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ReleveFilter } from '../releve-filter';
import { ReleveRow } from '../../../core/entities/releve-operations/releve-row';

@Component({
  selector: 'app-releve-operations',
  templateUrl: './releve-operations.component.html',
  styleUrls: ['./releve-operations.component.scss'],
})
export class ReleveOperationsComponent implements OnInit, AfterViewInit {
  protected displayedColumns: string[] = ['date', 'name', 'price', 'path'];
  protected dataSource: MatTableDataSource<ReleveRow>;
  protected nbCurrentFilters: number = 0;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly releveUsecases: ReleveUsecases) {
    this.dataSource = new MatTableDataSource<ReleveRow>();
  }

  public ngOnInit(): void {
    this.releveUsecases
      .refreshReleveOperations()
      .pipe(switchMap(() => this.operationsChanges()))
      .subscribe();
    this.releveUsecases
      .filtersChanges()
      .pipe(
        tap(),
        tap((filters: ReleveFilter) => (this.nbCurrentFilters = this.releveUsecases.countSetFilters(filters)))
      )
      .subscribe();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private operationsChanges(): Observable<void> {
    return this.releveUsecases.operationsChanges().pipe(
      combineLatestWith(this.releveUsecases.filtersChanges()),
      map(([rows, filters]) => this.releveUsecases.filterOperations(rows, filters)),
      tap(rows => (this.dataSource.data = rows)),
      returnVoid()
    );
  }

  protected sortChanged(sortState: Sort): void {
    console.log(sortState.active + ' - ' + sortState.direction);
  }
}
