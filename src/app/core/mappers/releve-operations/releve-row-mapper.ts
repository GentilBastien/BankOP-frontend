import { AbstractMapper } from '../abstract-mapper';
import { ReleveRowDto } from '../../dtos/releve-operations/releve-row.dto';
import { ReleveRow } from '../../entities/releve-operations/releve-row';
import { Injectable } from '@angular/core';
import { dateToString } from '../../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ReleveRowMapper extends AbstractMapper<ReleveRowDto, ReleveRow> {
  public fromDto(dto: ReleveRowDto): ReleveRow {
    return {
      date: new Date(dto.date),
      name: dto.name,
      price: dto.price,
      path: dto.path,
    };
  }

  public toDto(model: ReleveRow): ReleveRowDto {
    return {
      date: dateToString(model.date),
      name: model.name,
      price: model.price,
      path: model.path,
    };
  }
}
