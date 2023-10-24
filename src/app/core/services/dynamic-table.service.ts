import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { map, Observable } from 'rxjs';
import { DynamicTableDto } from '../dtos/dynamic-table/dynamic-table.dto';
import { Injectable } from '@angular/core';
import { TreePriceTableDto } from '../dtos/dynamic-table/tree-price-table.dto';

@Injectable({
  providedIn: 'root',
})
export class DynamicTableService extends ApiCallService<DynamicTableDto> {
  protected constructor(httpService: HttpClient) {
    super('dynamic', httpService);
  }

  public fetch(): Observable<TreePriceTableDto> {
    return this.get().pipe(map(dynamicDto => dynamicDto.data));
  }
}
