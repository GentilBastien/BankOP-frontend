import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bankop-search',
  templateUrl: './bankop-search.component.html',
  styleUrls: ['./bankop-search.component.scss'],
})
export class BankopSearchComponent {
  @Input() label: string;
  @Input({ required: true }) inputFormControl!: FormControl<string>;

  constructor() {
    this.label = '';
  }
}
