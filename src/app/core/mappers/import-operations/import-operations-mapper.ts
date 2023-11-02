import { Injectable } from '@angular/core';
import { AbstractMapper } from '../abstract-mapper';
import { ImportOperationDto } from '../../dtos/import-operations/import-operation.dto';
import { ImportOperation } from '../../entities/import-operations/import-operation';

@Injectable({
  providedIn: 'root',
})
export class ImportOperationsMapper extends AbstractMapper<ImportOperationDto, ImportOperation> {
  public fromDto(dto: ImportOperationDto): ImportOperation {
    const lazyMap: ImportOperation = dto as unknown as ImportOperation;
    return {
      ...lazyMap,
      date: new Date(dto.date),
    };
  }

  public toDto(model: ImportOperation): ImportOperationDto {
    throw Error(`unused ${model}`);
  }
}
