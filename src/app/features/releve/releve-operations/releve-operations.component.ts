import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReleveUsecases } from '../releve-usecases';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, switchMap, tap } from 'rxjs';
import { returnVoid } from '../../../shared/custom-operators/ReturnVoid';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ReleveRow } from '../../../core/entities/releve-operations/releve-row';
import { ConfigurationFilterUsecases } from '../../configuration-filter/configuration-filter-usecases';

@Component({
  selector: 'app-releve-operations',
  templateUrl: './releve-operations.component.html',
  styleUrls: ['./releve-operations.component.scss'],
})
export class ReleveOperationsComponent implements OnInit, AfterViewInit {
  protected displayedColumns: string[] = ['date', 'name', 'price', 'path'];
  protected dataSource: MatTableDataSource<ReleveRow>;
  protected categories$: Observable<string[]>;
  protected currentFilters$: Observable<number>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly releveUsecases: ReleveUsecases,
    private readonly configurationFilterUsecases: ConfigurationFilterUsecases
  ) {
    this.dataSource = new MatTableDataSource<ReleveRow>();
    this.categories$ = this.releveUsecases.categoriesChanges();
    this.currentFilters$ = this.configurationFilterUsecases.countSetFilters();
  }

  public ngOnInit(): void {
    this.releveUsecases
      .refreshReleveOperations()
      .pipe(switchMap(() => this.operationsChanges()))
      .subscribe();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private operationsChanges(): Observable<void> {
    return this.releveUsecases.operationsChanges().pipe(
      switchMap((listToFilter: ReleveRow[]) =>
        this.configurationFilterUsecases.filterWithPredicate<ReleveRow>(
          listToFilter,
          this.releveUsecases.filterPredicate
        )
      ),
      tap((rows: ReleveRow[]) => (this.dataSource.data = rows)),
      returnVoid()
    );
  }

  protected sortChanged(sortState: Sort): void {
    console.log(sortState.active + ' - ' + sortState.direction);
  }
}
