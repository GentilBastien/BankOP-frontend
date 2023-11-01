import { Injectable } from '@angular/core';
import { AbstractMapper } from '../abstract-mapper';
import { ImportRowDto } from '../../dtos/import-operations/import-row.dto';
import { ImportOperation } from '../../entities/import-operations/import-operation';

@Injectable({
  providedIn: 'root',
})
export class ImportOperationsMapper extends AbstractMapper<ImportRowDto, ImportOperation> {
  public fromDto(dto: ImportRowDto): ImportOperation {
    return {
      doublon: dto.doublon,
      date: new Date(dto.date),
      name: dto.name,
      price: dto.price,
      path: dto.path,
    };
  }

  public toDto(model: ImportOperation): ImportRowDto {
    return {
      doublon: model.doublon,
      date: model.date.toLocaleDateString(),
      name: model.name,
      price: model.price,
      path: model.path,
    };
  }
}
