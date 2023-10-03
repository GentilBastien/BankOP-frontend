import {NgModule} from '@angular/core';

import {HistoricRoutingModule} from './historic-routing.module';
import {ReleveOperationsComponent} from './releve-operations/releve-operations.component';
import {SharedModule} from "../../shared/shared.module";
import {HistoricStore} from "./HistoricStore";
import {HistoricUsecases} from "./HistoricUsecases";
import { FilterOperationComponent } from './filter-operation/filter-operation.component';


@NgModule({
  declarations: [
    ReleveOperationsComponent,
    FilterOperationComponent
  ],
  imports: [
    SharedModule,
    HistoricRoutingModule
  ],
  providers: [HistoricStore, HistoricUsecases]
})
export class HistoricModule {
}
