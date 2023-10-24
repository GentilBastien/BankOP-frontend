import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TreeTableDto } from '../dtos/tree-table/tree-table.dto';

@Injectable({
  providedIn: 'root',
})
export class TreeTableService extends ApiCallService<TreeTableDto> {
  protected constructor(httpService: HttpClient) {
    super('tree-table', httpService);
  }

  public fetch(): Observable<TreeTableDto> {
    return this.get();
  }
}
