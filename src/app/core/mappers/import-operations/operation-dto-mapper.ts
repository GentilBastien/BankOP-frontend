import { AbstractMapper } from '../abstract-mapper';
import { OperationDto } from '../../dtos/operation.dto';
import { ImportOperation } from '../../entities/import-operations/import-operation';
import { Injectable } from '@angular/core';
import { dateToString } from '../../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class OperationDtoMapper extends AbstractMapper<ImportOperation, OperationDto> {
  public fromDto(dto: ImportOperation): OperationDto {
    return {
      id: undefined,
      idMother: undefined,
      idCategory: dto.categoryId,
      date: dateToString(dto.date),
      name: dto.name,
      price: dto.price,
      manually_categorized: false,
    };
  }

  public toDto(model: OperationDto): ImportOperation {
    throw Error(`unused ${model}`);
  }
}
