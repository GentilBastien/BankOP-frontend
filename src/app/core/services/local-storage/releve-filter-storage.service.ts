import { LocalStorageService } from './local-storage.service';
import { ReleveFilter } from '../../../features/releve/releve-filter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReleveFilterStorageService extends LocalStorageService<ReleveFilter> {
  constructor() {
    super('API_RELEVE_FILTERS');
  }
}
