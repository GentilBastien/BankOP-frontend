import { Injectable } from '@angular/core';
import { Alert } from '../../core/entities/alert/alert';
import { AlertsStore } from './alerts-store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertsUsecases {
  constructor(private readonly alertsStore: AlertsStore) {}

  public alertChanges(): Observable<Alert[]> {
    return this.alertsStore.alerts$;
  }

  public displayAlert(message: string): void {
    const alert: Alert = {
      message,
    };
    this.alertsStore.pushAlert(alert);
    setTimeout(() => this.alertsStore.removeAlertAfterDelay(), 4000);
  }
}
