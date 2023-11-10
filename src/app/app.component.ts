import { Component } from '@angular/core';
import { AlertsUsecases } from './features/alerts/alerts-usecases';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BankOP-frontend';

  constructor(private readonly alertsUsecases: AlertsUsecases) {}

  displayAlert() {
    this.alertsUsecases.displayAlertWarn(this.generateRandomString(12));
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
}
