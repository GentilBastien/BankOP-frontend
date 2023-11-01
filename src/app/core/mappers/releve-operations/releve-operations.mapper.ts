import { AbstractMapper } from '../abstract-mapper';
import { ReleveOperationDto } from '../../dtos/releve-operations/releve-operation.dto';
import { ReleveOperation } from '../../entities/releve-operations/releve-operation';
import { Injectable } from '@angular/core';
import { ReleveRowMapper } from './releve-row-mapper';
import { ReleveRowDto } from '../../dtos/releve-operations/releve-row.dto';
import { ReleveRow } from '../../entities/releve-operations/releve-row';

@Injectable({
  providedIn: 'root',
})
export class ReleveOperationsMapper extends AbstractMapper<ReleveOperationDto, ReleveOperation> {
  constructor(private readonly releveRowMapper: ReleveRowMapper) {
    super();
  }

  public fromDto(dto: ReleveOperationDto): ReleveOperation {
    return {
      rows: dto.rows.map((releveRowDto: ReleveRowDto) => this.releveRowMapper.fromDto(releveRowDto)),
      minDate: new Date(dto.minDate),
      maxDate: new Date(dto.maxDate),
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
      categories: dto.categories,
    };
  }

  public toDto(model: ReleveOperation): ReleveOperationDto {
    return {
      rows: model.rows.map((releveRow: ReleveRow) => this.releveRowMapper.toDto(releveRow)),
      minDate: model.minDate.toLocaleDateString(),
      maxDate: model.maxDate.toLocaleDateString(),
      minPrice: model.minPrice,
      maxPrice: model.maxPrice,
      categories: model.categories,
    };
  }
}
