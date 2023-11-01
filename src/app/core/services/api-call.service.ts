import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseEndpoint: string = 'http://localhost:8080/api/v1/';

export abstract class ApiCallService<DTO> {
  protected readonly endpointApi: string;

  protected constructor(
    endpoint: string,
    protected readonly httpService: HttpClient
  ) {
    this.endpointApi = baseEndpoint + endpoint;
  }

  public create<DTO>(item: DTO): Observable<DTO> {
    return this.httpService.post<DTO>(this.endpointApi, item);
  }

  public getById(id: string): Observable<DTO> {
    const url: string = this.endpointApi + '/' + id;
    return this.httpService.get<DTO>(url);
  }

  public getAll(): Observable<DTO[]> {
    return this.httpService.get<DTO[]>(this.endpointApi);
  }

  public get(): Observable<DTO> {
    return this.httpService.get<DTO>(this.endpointApi);
  }

  public delete(id: string): Observable<void> {
    const url: string = this.endpointApi + '/' + id;
    return this.httpService.delete<void>(url);
  }
}
