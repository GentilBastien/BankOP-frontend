import { AbstractMapper } from '../abstract-mapper';
import { ConfigurationFilterDto } from '../../dtos/configuration-filter/configuration-filter-dto';
import { ConfigurationFilter } from '../../entities/configuration-filter/configuration-filter';
import { dateToString } from '../../../shared/utils/utils';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationFilterMapper extends AbstractMapper<ConfigurationFilterDto, ConfigurationFilter> {
  public fromDto(dto: ConfigurationFilterDto): ConfigurationFilter {
    return {
      id: dto.id,
      name: dto.name,
      minDate: dto.minDate ? new Date(dto.minDate) : undefined,
      maxDate: dto.maxDate ? new Date(dto.maxDate) : undefined,
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
      search: dto.search,
      selectedCategories: dto.selectedCategories,
    };
  }

  public toDto(model: ConfigurationFilter): ConfigurationFilterDto {
    return {
      id: model.id,
      name: model.name!,
      minDate: model.minDate ? dateToString(model.minDate) : undefined,
      maxDate: model.maxDate ? dateToString(model.maxDate) : undefined,
      minPrice: model.minPrice,
      maxPrice: model.maxPrice,
      search: model.search,
      selectedCategories: model.selectedCategories,
    };
  }
}
