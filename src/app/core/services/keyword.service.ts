import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeywordMapper } from '../mappers/keyword-mapper';
import { CrudBaseService } from './crud-base.service';

@Injectable({
  providedIn: 'root',
})
export class KeywordService extends CrudBaseService {
  constructor(httpService: HttpClient, keywordMapper: KeywordMapper) {
    super('keywords', keywordMapper, httpService);
  }
}
