import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { ConfigurationFilter } from '../../entities/configuration-filter/configuration-filter';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationFilterStorageService extends LocalStorageService<ConfigurationFilter> {
  constructor() {
    super('API_CONFIGURATION_FILTERS');
  }
}
