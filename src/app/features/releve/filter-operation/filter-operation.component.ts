import { Component } from '@angular/core';
import { ReleveUsecases } from '../releve-usecases';

@Component({
  selector: 'filter-operation',
  templateUrl: './filter-operation.component.html',
  styleUrls: ['./filter-operation.component.scss'],
})
export class FilterOperationComponent {
  constructor(private readonly releveUsecases: ReleveUsecases) {}
}
