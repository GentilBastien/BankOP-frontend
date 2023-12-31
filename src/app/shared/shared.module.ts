import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RangePipe } from './custom-pipes/range-pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BaseTemplateComponent } from './components/base-template/base-template.component';
import { BankopDateComponent } from './components/bankop-date/bankop-date.component';
import { BankopSearchComponent } from './components/bankop-search/bankop-search.component';
import { BankopChipsComponent } from './components/bankop-chips/bankop-chips.component';
import { BankopPriceComponent } from './components/bankop-price/bankop-price.component';
import { DatePipe } from './custom-pipes/date-pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTreeModule } from '@angular/material/tree';

const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatBadgeModule,
  MatMenuModule,
  MatInputModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatCardModule,
  MatPaginatorModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatTableModule,
  MatSortModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTabsModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatDatepickerModule,
  FormsModule,
  MatDialogModule,
  MatProgressBarModule,
  MatTreeModule,
];

const components = [
  BaseTemplateComponent,
  BankopDateComponent,
  BankopSearchComponent,
  BankopChipsComponent,
  BankopPriceComponent,
];

const pipes = [RangePipe, DatePipe];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, ...materialModules],
  exports: [CommonModule, ...materialModules, ...components, ...pipes],
})
export class SharedModule {}
