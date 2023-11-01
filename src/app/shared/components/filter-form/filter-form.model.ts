import { AbstractControl } from '@angular/forms';

export interface FilterFormModel {
  name: AbstractControl<string | undefined>;
  minDate: AbstractControl<Date | undefined>;
  maxDate: AbstractControl<Date | undefined>;
  minPrice: AbstractControl<number | undefined>;
  maxPrice: AbstractControl<number | undefined>;
  search: AbstractControl<string>;
  selectedCategories: AbstractControl<string[]>;
}
