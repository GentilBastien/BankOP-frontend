import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ReleveFilter } from '../releve-filter';
import { ReleveUsecases } from '../releve-usecases';

@Component({
  selector: 'filter-operation',
  templateUrl: './filter-operation.component.html',
  styleUrls: ['./filter-operation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterOperationComponent {
  protected filters$: Observable<ReleveFilter>;
  protected savedFilters$: Observable<ReleveFilter[]>;
  protected categories$: Observable<string[]>;

  constructor(private readonly releveUsecases: ReleveUsecases) {
    this.filters$ = this.releveUsecases.filtersChanges();
    this.savedFilters$ = this.releveUsecases.savedFiltersChanges();
    this.categories$ = this.releveUsecases.categoriesChanges();
  }

  protected filtersChanged($event: ReleveFilter): void {
    this.releveUsecases.setFilters($event);
  }
}
