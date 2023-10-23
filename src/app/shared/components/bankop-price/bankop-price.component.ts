import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'bankop-price',
  templateUrl: './bankop-price.component.html',
  styleUrls: ['./bankop-price.component.scss'],
})
export class BankopPriceComponent implements OnChanges {
  @Input() label: string;
  @Input() price: number | undefined;
  @Output() priceChanged: EventEmitter<number | undefined>;
  protected formControl: FormControl;

  constructor() {
    this.label = '';
    this.priceChanged = new EventEmitter<number | undefined>();
    this.formControl = new FormControl();
    this.formControl.valueChanges.pipe(tap(price => this.priceChanged.emit(price))).subscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const price: number | undefined = changes['price'].currentValue;
    if (price !== changes['price'].previousValue && price !== this.formControl.value) {
      this.formControl.setValue(price);
    }
  }
}
