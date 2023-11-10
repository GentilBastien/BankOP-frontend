import { Injectable } from '@angular/core';
import { Alert, AlertType, BUILD_ALERT } from '../../core/entities/alert/alert';
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

  public displayAlertSuccess(message: string): void {
    const alert: Alert = BUILD_ALERT(message, AlertType.SUCCESS);
    this.pushAlert(alert);
  }

  public displayAlertInfo(message: string): void {
    const alert: Alert = BUILD_ALERT(message, AlertType.INFO);
    console.log(alert);
    this.pushAlert(alert);
  }

  public displayAlertWarn(message: string): void {
    const alert: Alert = BUILD_ALERT(message, AlertType.WARN);
    this.pushAlert(alert);
  }

  public displayAlertError(message: string): void {
    const alert: Alert = BUILD_ALERT(message, AlertType.ERROR);
    this.pushAlert(alert);
  }

  private pushAlert(alert: Alert): void {
    this.alertsStore.pushAlert(alert);
    setTimeout(() => this.alertsStore.removeAlertAfterDelay(), 4000);
  }
}
