import {OperationDto} from "../dtos/OperationDto";
import {Operation} from "../entities/Operation";
import {Injectable} from "@angular/core";
import {BaseMapper} from "./BaseMapper";

@Injectable({
  providedIn: 'root',
})
export class OperationMapper extends BaseMapper {
  public override fromDto(dto: OperationDto): Operation {
    const baseEntity = super.fromDto(dto);
    const operationEntity = {
      idMother: dto.idMother,
      date: dto.date,
      price: dto.price,
      manually_categorized: dto.manually_categorized
    };
    return {...baseEntity, ...operationEntity};
  }

  public override toDto(model: Operation): OperationDto {
    const baseDto = super.toDto(model);
    const operationDto = {
      idMother: model.idMother,
      date: model.date,
      price: model.price,
      manually_categorized: model.manually_categorized
    };
    return {...baseDto, ...operationDto};
  }

  public override fromStringToDto(names: string[]): OperationDto {
    return {
      id: undefined,
      idMother: Number(names[1]),
      idCategory: Number(names[2]),
      date: names[3],
      name: names[4],
      price: Number(names[5]),
      manually_categorized: true
    }
  }
}
