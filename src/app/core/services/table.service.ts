import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableMapper } from '../mappers/table-mapper';
import { CrudBaseService } from './crud-base.service';

@Injectable({
  providedIn: 'root',
})
export class TableService extends CrudBaseService {
  constructor(
    httpService: HttpClient,
    private readonly tableMapper: TableMapper
  ) {
    super('tables', tableMapper, httpService);
  }
}
