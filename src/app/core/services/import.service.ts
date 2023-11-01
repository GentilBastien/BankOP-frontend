import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ImportRowDto } from '../dtos/import-operations/import-row.dto';
import { ImportOperationsMapper } from '../mappers/import-operations/import-operations.mapper';
import { ImportRawOperationDto } from '../dtos/import-operations/import-raw-operation.dto';
import { ImportOperation } from '../entities/import-operations/import-operation';

@Injectable({
  providedIn: 'root',
})
export class ImportService extends ApiCallService<ImportRowDto> {
  protected constructor(
    httpService: HttpClient,
    private readonly importOperationsMapper: ImportOperationsMapper
  ) {
    super('import', httpService);
  }

  public fetch(rawOperations: ImportRawOperationDto[]): Observable<ImportOperation[]> {
    return this.create(rawOperations).pipe(
      map((rawOperations: ImportRawOperationDto[]) => rawOperations as ImportRowDto[]),
      map((importRowDtoArray: ImportRowDto[]) =>
        importRowDtoArray.map((importRowDto: ImportRowDto) => this.importOperationsMapper.fromDto(importRowDto))
      )
    );
  }
}
