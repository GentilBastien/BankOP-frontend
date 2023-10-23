import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {KeywordMapper} from "../mappers/keyword-mapper";
import {BaseService} from "./BaseService";

@Injectable({
  providedIn: 'root',
})
export class KeywordService extends BaseService {
  constructor(httpService: HttpClient, private readonly keywordMapper: KeywordMapper) {
    super("keywords", keywordMapper, httpService);
  }
}
