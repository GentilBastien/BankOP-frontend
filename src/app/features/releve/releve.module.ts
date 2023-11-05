import { NgModule } from '@angular/core';

import { ReleveRoutingModule } from './releve-routing.module';
import { ReleveOperationsComponent } from './releve-operations/releve-operations.component';
import { SharedModule } from '../../shared/shared.module';
import { ReleveStore } from './releve-store';
import { ReleveUsecases } from './releve-usecases';
import { FilterOperationComponent } from './filter-operation/filter-operation.component';
import { ConfigurationFilterModule } from '../configuration-filter/configuration-filter.module';

@NgModule({
  declarations: [ReleveOperationsComponent, FilterOperationComponent],
  imports: [SharedModule, ReleveRoutingModule, ConfigurationFilterModule],
  providers: [ReleveStore, ReleveUsecases],
})
export class ReleveModule {}
