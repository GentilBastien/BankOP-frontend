import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filterNullish } from '../../custom-operators/FilterNullish';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'bankop-search',
  templateUrl: './bankop-search.component.html',
  styleUrls: ['./bankop-search.component.scss'],
})
export class BankopSearchComponent implements OnChanges {
  @Input() search: string;
  @Input() label: string;
  @Output() searchChanged: EventEmitter<string>;
  protected formControl: FormControl<string | null>;

  constructor() {
    this.search = '';
    this.label = '';
    this.searchChanged = new EventEmitter<string>();
    this.formControl = new FormControl<string>('');
    this.formControl.valueChanges
      .pipe(
        filterNullish(),
        debounceTime(250),
        tap(search => this.searchChanged.emit(search))
      )
      .subscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const search: string = changes['search'].currentValue;
    if (search !== changes['search'].previousValue && search !== this.formControl.value) {
      this.formControl.setValue(search);
    }
  }
}
