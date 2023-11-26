import { NgModule } from '@angular/core';
import { ConfigurationFilterStore } from './configuration-filter-store';
import { ConfigurationFilterUsecases } from './configuration-filter-usecases';
import { SharedModule } from '../../shared/shared.module';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

@NgModule({
  declarations: [FilterFormComponent, FilterDialogComponent],
  imports: [SharedModule],
  providers: [ConfigurationFilterStore, ConfigurationFilterUsecases],
  exports: [FilterFormComponent],
})
export class ConfigurationFilterModule {}
