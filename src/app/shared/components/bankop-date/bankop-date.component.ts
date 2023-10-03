import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";

import * as _moment from 'moment';
import _rollupMoment, {Moment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {tap} from "rxjs";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'bankop-date',
  templateUrl: './bankop-date.component.html',
  styleUrls: ['./bankop-date.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,
})
export class BankopDateComponent implements OnChanges {
  @Input() date: Moment | undefined;
  @Output() dateChanged: EventEmitter<Moment> = new EventEmitter<Moment>();
  protected formControl: FormControl = new FormControl();

  constructor() {
    this.formControl.valueChanges.pipe(
      tap(moment => this.dateChanged.emit(moment))
    ).subscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const date: Moment | undefined = changes['date'].currentValue;
    if (date !== changes['date'].previousValue && date !== this.formControl.value) {
      this.formControl.setValue(date);
    }
  }

  protected setMonthAndYear(event$: Moment, datepicker: MatDatepicker<Moment>): void {
    let oneMoment: Moment = moment();
    oneMoment.month(event$.month());
    oneMoment.year(event$.year());
    this.formControl.setValue(oneMoment);
    datepicker.close();
  }
}
