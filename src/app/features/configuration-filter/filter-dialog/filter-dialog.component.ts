import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent {
  protected formControl: FormControl<string>;

  constructor(private dialogRef: MatDialogRef<FilterDialogComponent>) {
    this.formControl = new FormControl('', {
      nonNullable: true,
      updateOn: 'change',
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(15)],
    });
  }

  protected onCancelClick(): void {
    this.dialogRef.close();
  }

  protected onSubmitClick(): void {
    const result: string = this.formControl.value;
    this.dialogRef.close(result);
  }
}
