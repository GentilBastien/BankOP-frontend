import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReleveOperationsComponent} from "./releve-operations/releve-operations.component";

const routes: Routes = [
  {
    path: '',
    component: ReleveOperationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricRoutingModule {
}
