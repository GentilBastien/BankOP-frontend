import {AbstractMapper} from "./AbstractMapper";
import {BaseDto} from "../dtos/BaseDto";
import {BaseEntity} from "../entities/BaseEntity";

export class BaseMapper extends AbstractMapper<BaseDto, BaseEntity> {

  public fromDto(dto: BaseDto): BaseEntity {
    return {
      id: dto.id,
      idCategory: dto.idCategory,
      name: dto.name
    }
  }

  public toDto(model: BaseEntity): BaseDto {
    return {
      id: model.id,
      idCategory: model.idCategory,
      name: model.name
    }
  }

  public fromStringToDto(names: string[]): BaseDto {
    return {
      id: undefined,
      idCategory: Number(names[1]),
      name: names[2]
    }
  }
}
