import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../../core/entities/alert/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertsStore {
  private alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  public alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

  public pushAlert(alert: Alert): void {
    const alerts: Alert[] = this.alertsSubject.getValue();
    const newAlerts: Alert[] = [alert];
    newAlerts.push(...alerts);
    this.alertsSubject.next(newAlerts);
  }

  public deleteAlert(alert: Alert): void {
    // const newAlerts: Alert[] = this.alertsSubject.getValue();
    // newAlerts.splice(alert.sequenceOrder, 1);
    // this.alertsSubject.next(newAlerts);
  }

  public removeAlertAfterDelay() {
    const alerts: Alert[] = this.alertsSubject.getValue();
    const newAlerts: Alert[] = alerts.slice(0, -1);
    this.alertsSubject.next(newAlerts);
  }
}
