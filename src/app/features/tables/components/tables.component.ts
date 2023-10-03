import {Component} from '@angular/core';
import {BaseComponent} from "../../../shared/base.component";
import {TableService} from "../../../core/services/TableService";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html'
})
export class TablesComponent extends BaseComponent {
  constructor(private readonly tableService: TableService, fb: FormBuilder) {
    super(tableService, fb);
  }
}
