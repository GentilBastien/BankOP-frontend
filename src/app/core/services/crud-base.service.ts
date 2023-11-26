import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { CrudBaseDto } from '../dtos/crud-base.dto';
import { BaseMapper } from '../mappers/base-mapper';
import { CrudBaseEntity } from '../entities/crud-base.entity';

export abstract class CrudBaseService extends ApiCallService<CrudBaseDto> {
  protected constructor(
    endpoint: string,
    private readonly baseMapper: BaseMapper,
    httpService: HttpClient
  ) {
    super(endpoint, httpService);
  }

  public fetchAllEntities(): Observable<CrudBaseEntity[]> {
    return this.getAll().pipe(map(baseDtoArray => baseDtoArray.map(baseDto => this.baseMapper.fromDto(baseDto))));
  }

  public createEntities(properties: string[]): void {
    const dto: CrudBaseDto = this.baseMapper.fromStringToDto(properties);
    this.create(dto).subscribe();
  }

  public createEntity(dto: CrudBaseDto): void {
    this.create(dto).subscribe();
  }

  public deleteEntity(id: string): void {
    this.delete(id).subscribe();
  }
}
