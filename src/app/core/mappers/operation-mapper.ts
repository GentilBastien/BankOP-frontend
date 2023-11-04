import { OperationDto } from '../dtos/operation.dto';
import { Operation } from '../entities/operation';
import { Injectable } from '@angular/core';
import { BaseMapper } from './base-mapper';
import { dateToString } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class OperationMapper extends BaseMapper {
  public override fromDto(dto: OperationDto): Operation {
    const baseEntity = super.fromDto(dto);
    const operationEntity = {
      idMother: dto.idMother,
      date: new Date(dto.date),
      price: dto.price,
      manually_categorized: dto.manually_categorized,
    };
    return { ...baseEntity, ...operationEntity };
  }

  public override toDto(model: Operation): OperationDto {
    const baseDto = super.toDto(model);
    const operationDto = {
      idMother: model.idMother,
      date: dateToString(model.date),
      price: model.price,
      manually_categorized: model.manually_categorized,
    };
    return { ...baseDto, ...operationDto };
  }

  public override fromStringToDto(names: string[]): OperationDto {
    return {
      id: undefined,
      idMother: names[1] ? Number(names[1]) : undefined,
      idCategory: Number(names[2]),
      date: names[3],
      name: names[4],
      price: Number(names[5]),
      manually_categorized: true,
    };
  }
}
