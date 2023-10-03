import {Injectable} from "@angular/core";
import {DynamicTableHeader} from "./DynamicTableHeader";
import {DynamicTableStore} from "./DynamicTableStore";
import {Observable} from "rxjs";
import {TreePriceTableDto} from "../../core/dtos/dynamic-table/TreePriceTableDto";

@Injectable()
export class DynamicTableUsecases {

  constructor(private readonly dynamicTableStore: DynamicTableStore) {
  }

  public refreshDynamicTable(): Observable<void> {
    return this.dynamicTableStore.refreshDynamicTable();
  }

  public headerChanges(): Observable<DynamicTableHeader[]> {
    return this.dynamicTableStore.headers$;
  }

  public dynamicTableChanges(): Observable<TreePriceTableDto> {
    return this.dynamicTableStore.yearDtos$;
  }

  public setHeaders(headers: DynamicTableHeader[]): void {
    this.dynamicTableStore.setHeaders(headers);
  }

  public computesNumCols(headers: DynamicTableHeader[]): number {
    return headers.reduce((nCols: number, header: DynamicTableHeader) => nCols + (header.selected ? 12 : 1), 0);
  }

  public computesMonthNames(headers: DynamicTableHeader[]): string[] {
    const monthNames: string[] = ['dec', 'nov', 'oct', 'sept', 'août', 'juil', 'juin', 'mai', 'avr', 'mars', 'fév', 'jan'];
    return headers.map(header => header.selected ? monthNames : '').flat();
  }
}
