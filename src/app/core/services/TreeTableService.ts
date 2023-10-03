import {HttpClient} from "@angular/common/http";
import {ApiService} from "./ApiService";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TreeTableDto} from "../dtos/tree-table/TreeTableDto";

@Injectable({
  providedIn: 'root',
})
export class TreeTableService extends ApiService<TreeTableDto> {
  protected constructor(httpService: HttpClient) {
    super('tree-table', httpService);
  }

  public fetch(): Observable<TreeTableDto> {
    return this.get();
  }
}
