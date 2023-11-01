import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bankop-price',
  templateUrl: './bankop-price.component.html',
  styleUrls: ['./bankop-price.component.scss'],
})
export class BankopPriceComponent {
  @Input() label: string;
  @Input({ required: true }) inputFormControl!: FormControl<number | undefined>;

  constructor() {
    this.label = '';
  }
}
