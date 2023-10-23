import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {OperationMapper} from "../mappers/operation-mapper";
import {BaseService} from "./BaseService";

@Injectable({
  providedIn: 'root',
})
export class OperationService extends BaseService {
  constructor(httpService: HttpClient, private readonly operationMapper: OperationMapper) {
    super("operations", operationMapper, httpService);
  }
}
