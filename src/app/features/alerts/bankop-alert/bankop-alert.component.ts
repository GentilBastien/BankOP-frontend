import { Component, Input } from '@angular/core';
import { Alert } from '../../../core/entities/alert/alert';

@Component({
  selector: 'bankop-alert',
  templateUrl: './bankop-alert.component.html',
  styleUrls: ['./bankop-alert.component.scss'],
})
export class BankopAlertComponent {
  @Input() alert!: Alert;

  constructor() {}
}
