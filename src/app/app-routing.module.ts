import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tables',
    loadChildren: () => import('./features/tables/tables.module').then(m => m.TablesModule),
  },
  {
    path: 'operations',
    loadChildren: () => import('./features/operations/operations.module').then(m => m.OperationsModule),
  },
  {
    path: 'keywords',
    loadChildren: () => import('./features/keywords/keywords.module').then(m => m.KeywordsModule),
  },
  {
    path: 'dynamic',
    loadChildren: () => import('./features/dynamic-table/dynamic-table.module').then(m => m.DynamicTableModule),
  },
  {
    path: 'import',
    loadChildren: () => import('./features/import/import.module').then(m => m.ImportModule),
  },
  {
    path: 'tree',
    loadChildren: () => import('./features/tree/tree.module').then(m => m.TreeModule),
  },
  {
    path: 'releve',
    loadChildren: () => import('./features/releve/releve.module').then(m => m.ReleveModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
