import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bankop-chips',
  templateUrl: './bankop-chips.component.html',
  styleUrls: ['./bankop-chips.component.scss'],
})
export class BankopChipsComponent {
  @Input() label: string;
  @Input() categories$: Observable<string[]>;
  @Input({ required: true }) inputFormControl!: FormControl<string[]>;
  constructor() {
    this.label = '';
    this.categories$ = of([]);
  }
}
