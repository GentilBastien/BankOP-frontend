import {NgModule} from '@angular/core';

import {ReleveRoutingModule} from './releve-routing.module';
import {ReleveOperationsComponent} from './releve-operations/releve-operations.component';
import {SharedModule} from "../../shared/shared.module";
import {ReleveStore} from "./releve-store";
import {ReleveUsecases} from "./releve-usecases";
import {FilterOperationComponent} from './filter-operation/filter-operation.component';
import {DialogFilterNameComponent} from './filter-operation/dialog-filter-name/dialog-filter-name.component';


@NgModule({
  declarations: [
    ReleveOperationsComponent,
    FilterOperationComponent,
    DialogFilterNameComponent
  ],
  imports: [
    SharedModule,
    ReleveRoutingModule
  ],
  providers: [ReleveStore, ReleveUsecases]
})
export class ReleveModule {
}
