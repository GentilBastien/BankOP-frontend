import { Injectable } from '@angular/core';
import { ConfigurationFilterDto } from '../dtos/configuration-filter/configuration-filter-dto';
import { ApiCallService } from './api-call.service';
import { ConfigurationFilterMapper } from '../mappers/configuration-filter/configuration-filter-mapper';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ConfigurationFilter } from '../entities/configuration-filter/configuration-filter';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationFilterService extends ApiCallService<ConfigurationFilterDto> {
  protected constructor(
    httpService: HttpClient,
    private readonly configurationFilterMapper: ConfigurationFilterMapper
  ) {
    super('config-filter', httpService);
  }

  public fetchAllConfigurationFilters(): Observable<ConfigurationFilter[]> {
    return this.getAll().pipe(
      map((configFiltersDtos: ConfigurationFilterDto[]) =>
        configFiltersDtos.map((configFilterDto: ConfigurationFilterDto) =>
          this.configurationFilterMapper.fromDto(configFilterDto)
        )
      )
    );
  }

  public createConfigurationFilter(configurationFilter: ConfigurationFilter): Observable<ConfigurationFilterDto> {
    const configFilterDto: ConfigurationFilterDto = this.configurationFilterMapper.toDto(configurationFilter);
    return this.create(configFilterDto);
  }

  public deleteConfigurationFilter(id: string): Observable<void> {
    return this.delete(id);
  }
}
