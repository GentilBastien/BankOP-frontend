import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable, of, startWith, tap, withLatestFrom } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'bankop-chips',
  templateUrl: './bankop-chips.component.html',
  styleUrls: ['./bankop-chips.component.scss'],
})
export class BankopChipsComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() label: string;
  @Input() categories$: Observable<string[]>;
  @Input() selectedOptions: string[];
  @Output() selectionChanged: EventEmitter<string[]>;
  protected searchFormControl: FormControl<string>;
  protected filteredOptions$: Observable<string[]>;
  @ViewChild('chipsInput') input!: ElementRef<HTMLInputElement>;

  constructor() {
    this.label = '';
    this.categories$ = of([]);
    this.selectedOptions = [];
    this.selectionChanged = new EventEmitter<string[]>();
    this.searchFormControl = new FormControl<string>('', { nonNullable: true });
    this.filteredOptions$ = of([]);
  }

  private filter = (value: string, values: string[]): string[] =>
    values
      .filter((option: string) => !this.selectedOptions.includes(option))
      .filter((option: string) => option.toLowerCase().includes(value.toLowerCase()));

  public ngOnInit(): void {
    this.categories$.subscribe();
    this.filteredOptions$ = this.searchFormControl.valueChanges.pipe(
      startWith(''),
      withLatestFrom(this.categories$),
      map(([input, categories]) => this.filter(input, categories)),
      filter(() => !!this.input),
      tap((categories: string[]) => {
        if (categories.length === 0) {
          this.input.nativeElement.style.display = 'none';
        }
      })
    );
  }

  protected remove(option: string): void {
    const index: number = this.selectedOptions.indexOf(option);
    this.selectedOptions.splice(index, 1);
    this.input.nativeElement.style.display = 'initial';
    this.selectionChanged.emit(this.selectedOptions);
  }

  protected addFromEnterOrComma($event: MatChipInputEvent): void {
    const value: string = $event.value;
    this.addSelection(value);
  }

  protected addFromSelect($event: MatAutocompleteSelectedEvent): void {
    const value: string = $event.option.viewValue;
    this.addSelection(value);
  }

  private addSelection(value: string) {
    this.selectedOptions.push(value);
    this.searchFormControl.setValue('');
    this.input.nativeElement.value = '';
    this.selectionChanged.emit(this.selectedOptions);
  }

  protected getInputFocus(): void {
    this.searchFormControl.setValue(this.searchFormControl.value);
  }
}
