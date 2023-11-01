import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'bankop-date',
  templateUrl: './bankop-date.component.html',
  styleUrls: ['./bankop-date.component.scss'],
})
export class BankopDateComponent {
  @Input() label: string;
  @Input({ required: true }) inputFormControl!: FormControl<Date | undefined>;

  constructor() {
    this.label = '';
  }

  protected setMonthAndYear(event$: Date, datepicker: MatDatepicker<Date>): void {
    this.inputFormControl.setValue(event$);
    datepicker.close();
  }
}
