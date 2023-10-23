import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-filter-name',
  templateUrl: './dialog-filter-name.component.html',
  styleUrls: ['./dialog-filter-name.component.scss'],
})
export class DialogFilterNameComponent {
  protected formControl: FormControl<string>;

  constructor(public dialogRef: MatDialogRef<DialogFilterNameComponent>) {
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
