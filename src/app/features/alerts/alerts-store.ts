import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from './alert';

@Injectable({
  providedIn: 'root',
})
export class AlertsStore {
  private alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  public alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

  public pushAlert(alert: Alert): void {
    const newAlerts: Alert[] = [alert];
    newAlerts.push(...this.alertsSubject.getValue());
    this.alertsSubject.next(newAlerts);
  }

  public removeAlertAfterDelay(): void {
    const alerts: Alert[] = this.alertsSubject.getValue();
    const newAlerts: Alert[] = alerts.slice(0, -1);
    this.alertsSubject.next(newAlerts);
  }
}
