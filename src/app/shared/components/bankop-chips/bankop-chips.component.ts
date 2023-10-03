import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {filterNullish} from "../../custom-operators/FilterNullish";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'bankop-chips',
  templateUrl: './bankop-chips.component.html',
  styleUrls: ['./bankop-chips.component.scss']
})
export class BankopChipsComponent implements OnChanges {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() categories: string[] = [];
  @ViewChild('chipsInput') input!: ElementRef<HTMLInputElement>;
  @Output() selectionChanged: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() selectedOptions: string[] = [];
  protected formControl: FormControl<string | null> = new FormControl<string>('');
  protected filteredOptions$: Observable<string[]>;

  constructor() {
    this.filteredOptions$ = this.formControl.valueChanges.pipe(
      filterNullish(),
      map(input => this._filter(input))
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    //TODO: en fonction des différences entre previous et current, il faut modifier les selected et categories
    const selectedOptions: string[] = changes['selectedOptions']?.currentValue;
    const previousSelectedOptions: string[] = changes['selectedOptions']?.previousValue;

    //TODO: pareil si c'est la liste de toutes les catégories
    const categories: string[] = changes['categories']?.currentValue;
    const previousCategories: string[] = changes['categories']?.previousValue;
    
    this.formControl.setValue('')
  }

  protected add(event: MatChipInputEvent): void {
    console.log('add');
    const value: string = event.value;
    const chosenOption: string | undefined = this.categories.find(option => option.includes(value));
    if (chosenOption) {
      this.selectedOptions.push(chosenOption);
      this.categories.splice(this.categories.indexOf(chosenOption), 1);
      this.formControl.setValue('');
      this.input.nativeElement.value = '';
      this.selectionChanged.emit(this.selectedOptions);
    }
    if (this.categories.length == 0) {
      this.input.nativeElement.style.display = 'none';
    }
  }


  protected selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected');
    const value: string = event.option.viewValue;
    this.selectedOptions.push(value);
    this.categories.splice(this.categories.indexOf(value), 1);
    this.formControl.setValue('');
    this.input.nativeElement.value = '';
    this.selectionChanged.emit(this.selectedOptions);
    if (this.categories.length == 0) {
      this.input.nativeElement.style.display = 'none';
    }
  }

  protected remove(value: string): void {
    console.log('remove');
    const index: number = this.selectedOptions.indexOf(value);
    if (this.categories.length == 0) {
      this.input.nativeElement.style.display = 'initial';
    }
    this.selectedOptions.splice(index, 1);
    this.categories.push(value);
    this.formControl.setValue('');
    this.selectionChanged.emit(this.selectedOptions);
  }

  private _filter = (value: string): string[] => this.categories.filter(option => option.toLowerCase().includes(value.toLowerCase()));
}
