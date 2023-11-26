import { NgModule } from '@angular/core';

import { TreeRoutingModule } from './tree-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TreeStore } from './tree-store';
import { TreeUsecases } from './tree-usecases';
import { TablePanelComponent } from './table-panel/table-panel.component';
import { TableKeywordsComponent } from './table-keywords/table-keywords.component';
import { TableTreeComponent } from './table-tree/table-tree.component';

@NgModule({
  declarations: [TableTreeComponent, TablePanelComponent, TableKeywordsComponent, TableTreeComponent],
  imports: [SharedModule, TreeRoutingModule],
  providers: [TreeStore, TreeUsecases],
})
export class TreeModule {}
