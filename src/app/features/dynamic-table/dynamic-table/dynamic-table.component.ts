import { Component, OnInit } from '@angular/core';
import { DynamicTableUsecases } from '../dynamic-table-usecases';
import { DynamicTableHeader } from '../dynamic-table-header';
import { Observable, switchMap, tap } from 'rxjs';
import { returnVoid } from '../../../shared/custom-operators/ReturnVoid';
import { PriceTableDto } from '../../../core/dtos/dynamic-table/price-table.dto';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  protected tables: PriceTableDto[] = [];
  protected headers: DynamicTableHeader[];
  protected numCols: number;
  protected monthNames: string[];

  constructor(private readonly dynamicTableUsecases: DynamicTableUsecases) {
    this.headers = [];
    this.numCols = 0;
    this.monthNames = [];
  }

  public ngOnInit(): void {
    this.dynamicTableUsecases
      .refreshDynamicTable()
      .pipe(
        switchMap(() => this.dynamicTableChanges()),
        switchMap(() => this.headerChanges()),
        tap(() => this.refreshPrices())
      )
      .subscribe();
  }

  protected toggleHeader(header: DynamicTableHeader): void {
    header.selected = !header.selected;
    this.refreshPrices();
    this.dynamicTableUsecases.setHeaders(this.headers);
  }

  protected toggleRow(table: PriceTableDto): void {
    const countExpandedChildren = (table: PriceTableDto): number => {
      if (!table.expanded) return 0;
      table.expanded = false;
      let count: number = 0;
      if (table.children) {
        table.children.forEach(child => {
          count += 1 + countExpandedChildren(child);
        });
      }
      return count;
    };
    if (table.children) {
      const index: number = this.tables.indexOf(table);
      if (!table.expanded) {
        this.tables.splice(index + 1, 0, ...table.children);
        table.expanded = true;
      } else {
        this.tables.splice(index + 1, countExpandedChildren(table));
      }
      this.refreshPrices();
    }
  }

  private refreshPrices(): void {
    this.tables.forEach(table => {
      table.computedPrices = this.headers
        .map(header =>
          header.selected
            ? table.expanded
              ? [...table.monthYearPrices[header.yearIndex]]
              : [...table.cumulatedMonthYearPrices[header.yearIndex]]
            : table.expanded
            ? table.yearPrices[header.yearIndex]
            : table.cumulatedYearPrices[header.yearIndex]
        )
        .flat();
    });
  }

  private headerChanges(): Observable<void> {
    return this.dynamicTableUsecases.headerChanges().pipe(
      tap(headers => (this.headers = headers)),
      tap(headers => (this.numCols = this.dynamicTableUsecases.computesNumCols(headers))),
      tap(headers => (this.monthNames = this.dynamicTableUsecases.computesMonthNames(headers))),
      returnVoid()
    );
  }

  private dynamicTableChanges(): Observable<void> {
    return this.dynamicTableUsecases.dynamicTableChanges().pipe(
      tap(priceTable => (this.tables = [priceTable.root!])),
      returnVoid()
    );
  }
}
