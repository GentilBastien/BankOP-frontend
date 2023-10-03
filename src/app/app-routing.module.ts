import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'tables',
    loadChildren: () => import('./features/tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'operations',
    loadChildren: () => import('./features/operations/operations.module').then(m => m.OperationsModule)
  },
  {
    path: 'keywords',
    loadChildren: () => import('./features/keywords/keywords.module').then(m => m.KeywordsModule)
  },
  {
    path: 'dynamic',
    loadChildren: () => import('./features/dynamic-table/dynamic-table.module').then(m => m.DynamicTableModule),
  },
  {
    path: 'releve',
    loadChildren: () => import('./features/historic/historic.module').then(m => m.HistoricModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
