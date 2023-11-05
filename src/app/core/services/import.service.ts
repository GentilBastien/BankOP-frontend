import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { map, Observable, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { ImportOperationDto } from '../dtos/import-operations/import-operation.dto';
import { ImportOperation } from '../entities/import-operations/import-operation';
import { ImportOperationsMapper } from '../mappers/import-operations/import-operations-mapper';
import { OperationDtoMapper } from '../mappers/import-operations/operation-dto-mapper';
import { OperationService } from './operation.service';
import { OperationDto } from '../dtos/operation.dto';

@Injectable({
  providedIn: 'root',
})
export class ImportService extends ApiCallService<ImportOperationDto> {
  protected constructor(
    httpService: HttpClient,
    private readonly importOperationsMapper: ImportOperationsMapper,
    private readonly operationDtoMapper: OperationDtoMapper,
    private readonly operationService: OperationService
  ) {
    super('import', httpService);
  }

  public fetch(importOperationDtos: ImportOperationDto[]): Observable<ImportOperation[]> {
    return this.create<ImportOperationDto[]>(importOperationDtos).pipe(
      map((responseBody: ImportOperationDto[]) =>
        responseBody.map((importOperationDto: ImportOperationDto) =>
          this.importOperationsMapper.fromDto(importOperationDto)
        )
      )
    );
  }

  public pushOperation(importOperationDto: ImportOperation): void {
    const operationDto: OperationDto = this.operationDtoMapper.fromDto(importOperationDto);
    this.operationService.create<OperationDto>(operationDto).pipe(take(1)).subscribe();
  }
}
