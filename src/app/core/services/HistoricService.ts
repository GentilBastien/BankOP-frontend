import {HttpClient} from "@angular/common/http";
import {ApiService} from "./ApiService";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ReleveOperationDto} from "../dtos/releve-operations/ReleveOperationDto";
import {HistoricFilterMapper} from "../mappers/HistoricFilterMapper";
import {HistoricFilter} from "../../features/historic/HistoricFilter";

@Injectable({
  providedIn: 'root',
})
export class HistoricService extends ApiService<ReleveOperationDto> {
  protected constructor(httpService: HttpClient, private readonly historicFilterMapper: HistoricFilterMapper) {
    super('releve', httpService);
  }

  public mapToHistoricFilter(releve: ReleveOperationDto): HistoricFilter {
    return this.historicFilterMapper.mapToHistoricFilter(releve);
  }

  public fetch(): Observable<ReleveOperationDto> {
    return this.get();
  }
}
