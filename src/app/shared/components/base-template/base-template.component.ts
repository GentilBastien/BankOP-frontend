import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CrudBaseEntity } from '../../../core/entities/crud-base.entity';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-template',
  templateUrl: './base-template.component.html',
  styleUrls: ['./base-template.component.scss'],
})
export class BaseTemplateComponent {
  @Input({ required: true }) dataSource!: MatTableDataSource<CrudBaseEntity>;
  @Input({ required: true }) keys!: string[];
  @Input({ required: true }) createFormGroup!: FormGroup;
  @Input({ required: true }) deleteFormGroup!: FormGroup;
  @Output() submitCreated: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitDeleted: EventEmitter<void> = new EventEmitter<void>();

  public submitCreate(): void {
    this.submitCreated.emit();
  }

  public submitDelete(): void {
    this.submitDeleted.emit();
  }
}
