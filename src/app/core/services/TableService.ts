import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableMapper} from "../mappers/table-mapper";
import {BaseService} from "./BaseService";

@Injectable({
  providedIn: 'root',
})
export class TableService extends BaseService {
  constructor(httpService: HttpClient, private readonly tableMapper: TableMapper) {
    super("tables", tableMapper, httpService);
  }
}
