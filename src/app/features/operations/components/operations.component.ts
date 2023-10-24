import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OperationService } from '../../../core/services/operation.service';
import { BaseComponent } from '../../../shared/base.component';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
})
export class OperationsComponent extends BaseComponent {
  constructor(
    private readonly operationService: OperationService,
    fb: FormBuilder
  ) {
    super(operationService, fb);
  }

  protected override objKeys(): string[] {
    return ['id', 'idMother', 'idCategory', 'date', 'name', 'price'];
  }
}
