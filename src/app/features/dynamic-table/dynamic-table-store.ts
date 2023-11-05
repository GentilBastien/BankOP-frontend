import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DynamicTableService } from '../../core/services/dynamic-table.service';
import { TreePriceTableDto } from '../../core/dtos/dynamic-table/tree-price-table.dto';
import { returnVoid } from '../../shared/custom-operators/ReturnVoid';
import { DynamicTableHeader } from './dynamic-table-header';

@Injectable()
export class DynamicTableStore {
  private yearDtosSubject: BehaviorSubject<TreePriceTableDto> = new BehaviorSubject<TreePriceTableDto>({ years: [] });
  public yearDtos$: Observable<TreePriceTableDto> = this.yearDtosSubject.asObservable();

  private headersSubject: BehaviorSubject<DynamicTableHeader[]> = new BehaviorSubject<DynamicTableHeader[]>([]);
  public headers$: Observable<DynamicTableHeader[]> = this.headersSubject.asObservable();

  constructor(private readonly dynamicTableService: DynamicTableService) {}

  public setHeaders(headers: DynamicTableHeader[]): void {
    this.headersSubject.next(headers);
  }

  public refreshDynamicTable(): Observable<void> {
    return this.dynamicTableService.fetch().pipe(
      tap(treePrice => this.yearDtosSubject.next(treePrice)),
      tap(treePrice => this.headersSubject.next(this.mapDtoToHeaders(treePrice))),
      returnVoid()
    );
  }

  private mapDtoToHeaders(treePriceTable: TreePriceTableDto): DynamicTableHeader[] {
    return treePriceTable.years.map((year, index) => ({
      year: year,
      yearIndex: index,
      selected: false,
    }));
  }
}
