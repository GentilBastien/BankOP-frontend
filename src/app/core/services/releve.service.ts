import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ReleveOperationDto } from '../dtos/releve-operations/releve-operation.dto';
import { ReleveOperation } from '../entities/releve-operations/releve-operation';
import { ReleveOperationsMapper } from '../mappers/releve-operations/releve-operations-mapper';

@Injectable({
  providedIn: 'root',
})
export class ReleveService extends ApiCallService<ReleveOperationDto> {
  protected constructor(
    httpService: HttpClient,
    private readonly releveOperationsMapper: ReleveOperationsMapper
  ) {
    super('releve', httpService);
  }

  public fetch(): Observable<ReleveOperation> {
    return this.get().pipe(map((releveOpDto: ReleveOperationDto) => this.releveOperationsMapper.fromDto(releveOpDto)));
  }
}
