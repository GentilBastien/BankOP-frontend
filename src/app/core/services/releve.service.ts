import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ReleveOperationDto } from '../dtos/releve-operations/releve-operation.dto';
import { ReleveFilterMapper } from '../mappers/releve-filter-mapper';
import { ReleveFilter } from '../../features/releve/releve-filter';

@Injectable({
  providedIn: 'root',
})
export class ReleveService extends ApiCallService<ReleveOperationDto> {
  protected constructor(
    httpService: HttpClient,
    private readonly historicFilterMapper: ReleveFilterMapper
  ) {
    super('releve', httpService);
  }

  public mapToHistoricFilter(releve: ReleveOperationDto): ReleveFilter {
    return this.historicFilterMapper.mapToReleveFilter(releve);
  }

  public fetch(): Observable<ReleveOperationDto> {
    return this.get();
  }
}
