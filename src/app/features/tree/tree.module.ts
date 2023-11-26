import { NgModule } from '@angular/core';

import { TreeRoutingModule } from './tree-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TreeStore } from './tree-store';
import { TreeUsecases } from './tree-usecases';
import { TablePanelComponent } from './table-panel/table-panel.component';
import { TableKeywordsComponent } from './table-keywords/table-keywords.component';
import { TableTreeComponent } from './table-tree/table-tree.component';
import { TableControlComponent } from './table-control/table-control.component';

@NgModule({
  declarations: [TableTreeComponent, TablePanelComponent, TableKeywordsComponent, TableTreeComponent, TableControlComponent],
  imports: [SharedModule, TreeRoutingModule],
  providers: [TreeStore, TreeUsecases],
})
export class TreeModule {}
