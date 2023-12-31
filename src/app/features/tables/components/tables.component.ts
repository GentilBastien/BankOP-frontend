import { Component } from '@angular/core';
import { BaseComponent } from '../../../shared/base.component';
import { TableService } from '../../../core/services/table.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
})
export class TablesComponent extends BaseComponent {
  constructor(tableService: TableService, fb: FormBuilder) {
    super(tableService, fb);
  }
}
