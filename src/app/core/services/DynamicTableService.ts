import {HttpClient} from "@angular/common/http";
import {ApiService} from "./ApiService";
import {map, Observable} from "rxjs";
import {DynamicTableDto} from "../dtos/dynamic-table/DynamicTableDto";
import {Injectable} from "@angular/core";
import {TreePriceTableDto} from "../dtos/dynamic-table/TreePriceTableDto";

@Injectable({
  providedIn: 'root',
})
export class DynamicTableService extends ApiService<DynamicTableDto> {
  protected constructor(httpService: HttpClient) {
    super('dynamic', httpService);
  }

  public fetch(): Observable<TreePriceTableDto> {
    return this.get().pipe(map(dynamicDto => dynamicDto.data));
  }
}
