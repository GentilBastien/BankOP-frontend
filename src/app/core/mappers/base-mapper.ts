import { AbstractMapper } from './abstract-mapper';
import { CrudBaseDto } from '../dtos/crud-base.dto';
import { CrudBaseEntity } from '../entities/crud-base.entity';

export class BaseMapper extends AbstractMapper<CrudBaseDto, CrudBaseEntity> {
  public fromDto(dto: CrudBaseDto): CrudBaseEntity {
    return {
      id: dto.id,
      idCategory: dto.idCategory,
      name: dto.name,
    };
  }

  public toDto(model: CrudBaseEntity): CrudBaseDto {
    return {
      id: model.id,
      idCategory: model.idCategory,
      name: model.name,
    };
  }

  public fromStringToDto(names: string[]): CrudBaseDto {
    return {
      id: undefined,
      idCategory: Number(names[1]),
      name: names[2],
    };
  }
}
