import {NgModule} from '@angular/core';

import {ImportRoutingModule} from './import-routing.module';
import {ImportComponent} from './import/import.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ImportComponent
  ],
  imports: [
    SharedModule,
    ImportRoutingModule
  ]
})
export class ImportModule {
}
