import { NgModule } from '@angular/core';
import { BankopAlertStackComponent } from './bankop-alert-stack/bankop-alert-stack.component';
import { BankopAlertComponent } from './bankop-alert/bankop-alert.component';
import { SharedModule } from '../../shared/shared.module';
import { AlertsStore } from './alerts-store';

@NgModule({
  declarations: [BankopAlertStackComponent, BankopAlertComponent],
  imports: [SharedModule],
  providers: [AlertsStore],
  exports: [BankopAlertStackComponent],
})
export class AlertsModule {}
