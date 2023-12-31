import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AlertsModule } from './features/alerts/alerts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, SharedModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule, AlertsModule],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
