import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {KeywordsModule} from "./features/keywords/keywords.module";
import {OperationsModule} from "./features/operations/operations.module";
import {TablesModule} from "./features/tables/tables.module";
import {SharedModule} from "./shared/shared.module";

const features = [TablesModule, KeywordsModule, OperationsModule]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    ...features,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
