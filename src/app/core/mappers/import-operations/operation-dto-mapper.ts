import { AbstractMapper } from '../abstract-mapper';
import { OperationDto } from '../../dtos/operation.dto';
import { ImportOperation } from '../../entities/import-operations/import-operation';
import { Injectable } from '@angular/core';
import { dateToString } from '../../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class OperationDtoMapper extends AbstractMapper<OperationDto, ImportOperation> {
  public fromDto(dto: OperationDto): ImportOperation {
    throw Error(`unused ${dto}`);
  }

  public toDto(model: ImportOperation): OperationDto {
    return {
      id: undefined,
      idMother: undefined,
      idCategory: model.categoryId,
      date: dateToString(model.date),
      name: model.name,
      price: model.price,
      manually_categorized: false,
    };
  }
}
