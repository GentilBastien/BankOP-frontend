import {NgModule} from '@angular/core';

import {DynamicTableRoutingModule} from './dynamic-table-routing.module';
import {DynamicTableComponent} from './components/dynamic-table/dynamic-table.component';
import {SharedModule} from "../../shared/shared.module";
import {DynamicTableUsecases} from "./DynamicTableUsecases";
import {DynamicTableStore} from "./DynamicTableStore";


@NgModule({
  declarations: [
    DynamicTableComponent
  ],
  imports: [
    SharedModule,
    DynamicTableRoutingModule
  ],
  providers: [DynamicTableStore, DynamicTableUsecases]
})
export class DynamicTableModule {
}
