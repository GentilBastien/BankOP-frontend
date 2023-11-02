import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ImportOperationDto } from '../dtos/import-operations/import-operation.dto';
import { ImportOperation } from '../entities/import-operations/import-operation';
import { ImportOperationsMapper } from '../mappers/import-operations/import-operations-mapper';

@Injectable({
  providedIn: 'root',
})
export class ImportService extends ApiCallService<ImportOperationDto> {
  protected constructor(
    httpService: HttpClient,
    private readonly importOperationsMapper: ImportOperationsMapper
  ) {
    super('import', httpService);
  }

  public fetch(importOperationDtos: ImportOperationDto[]): Observable<ImportOperation[]> {
    return this.create(importOperationDtos).pipe(
      map((responseBody: ImportOperationDto[]) =>
        responseBody.map((importOperationDto: ImportOperationDto) =>
          this.importOperationsMapper.fromDto(importOperationDto)
        )
      )
    );
  }
}
