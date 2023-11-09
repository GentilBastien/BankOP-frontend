import { Component } from '@angular/core';
import { Alert } from '../../../core/entities/alert/alert';
import { Observable } from 'rxjs';
import { AlertsUsecases } from '../alerts-usecases';

@Component({
  selector: 'bankop-alert-stack',
  templateUrl: './bankop-alert-stack.component.html',
  styleUrls: ['./bankop-alert-stack.component.scss'],
})
export class BankopAlertStackComponent {
  protected alerts: Observable<Alert[]>;

  constructor(private readonly alertsUsecases: AlertsUsecases) {
    this.alerts = this.alertsUsecases.alertChanges();
  }
}
