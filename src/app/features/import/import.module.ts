import { NgModule } from '@angular/core';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import/import.component';
import { SharedModule } from '../../shared/shared.module';
import { ImportUsecases } from './import-usecases';
import { ImportStore } from './import-store';

@NgModule({
  declarations: [ImportComponent],
  imports: [SharedModule, ImportRoutingModule],
  providers: [ImportStore, ImportUsecases],
})
export class ImportModule {}
