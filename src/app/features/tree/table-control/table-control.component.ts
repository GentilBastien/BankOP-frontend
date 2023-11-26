import { Component } from '@angular/core';
import { TreeUsecases } from '../tree-usecases';
import { tap } from 'rxjs';

@Component({
  selector: 'table-control',
  templateUrl: './table-control.component.html',
  styleUrls: ['./table-control.component.scss'],
})
export class TableControlComponent {
  constructor(private readonly treeUsecases: TreeUsecases) {
    this.treeUsecases
      .selectedTreeNodeChanges()
      .pipe(tap(a => console.log(a)))
      .subscribe();
  }

  public add(): void {
    this.treeUsecases.add();
  }

  public rename(): void {
    this.treeUsecases.rename('table renamed!');
  }

  public delete(): void {
    this.treeUsecases.delete();
  }
}
