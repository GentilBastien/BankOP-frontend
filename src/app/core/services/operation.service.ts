import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationMapper } from '../mappers/operation-mapper';
import { CrudBaseService } from './crud-base.service';

@Injectable({
  providedIn: 'root',
})
export class OperationService extends CrudBaseService {
  constructor(httpService: HttpClient, operationMapper: OperationMapper) {
    super('operations', operationMapper, httpService);
  }
}
