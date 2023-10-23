import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ApiService} from "./ApiService";
import {BaseDto} from "../dtos/BaseDto";
import {BaseMapper} from "../mappers/base-mapper";
import {BaseEntity} from "../entities/BaseEntity";

export abstract class BaseService extends ApiService<BaseDto> {
  protected constructor(endpoint: string, private readonly baseMapper: BaseMapper, httpService: HttpClient) {
    super(endpoint, httpService);
  }

  public fetchAllEntities(): Observable<BaseEntity[]> {
    return this.getAll().pipe(
      map(baseDtoArray => baseDtoArray.map(baseDto => this.baseMapper.fromDto(baseDto)))
    );
  }

  public createEntity(names: string[]): void {
    const dto: BaseDto = this.baseMapper.fromStringToDto(names);
    this.create(dto).subscribe();
  }

  public deleteEntity(id: string): void {
    this.delete(id).subscribe();
  }
}
