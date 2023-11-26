import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationMapper } from '../mappers/operation-mapper';
import { CrudBaseService } from './crud-base.service';
import { ImportOperation } from '../entities/import-operations/import-operation';
import { OperationDto } from '../dtos/operation.dto';
import { OperationDtoMapper } from '../mappers/import-operations/operation-dto-mapper';

@Injectable({
  providedIn: 'root',
})
export class OperationService extends CrudBaseService {
  constructor(
    httpService: HttpClient,
    operationMapper: OperationMapper,
    private readonly operationDtoMapper: OperationDtoMapper
  ) {
    super('operations', operationMapper, httpService);
  }

  public pushOperation(importOperation: ImportOperation): void {
    const operationDto: OperationDto = this.operationDtoMapper.toDto(importOperation);
    this.createEntity(operationDto);
  }
}
