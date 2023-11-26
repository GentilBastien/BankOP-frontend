import { Component } from '@angular/core';
import { TreeUsecases } from '../tree-usecases';
import { map, Observable } from 'rxjs';
import { Keyword } from '../../../core/entities/keyword';
import { valueAsArray } from '../../../shared/utils/utils';
import { TreeNode } from '../../../core/entities/tree-table/tree-node';

@Component({
  selector: 'table-keywords',
  templateUrl: './table-keywords.component.html',
  styleUrls: ['./table-keywords.component.scss'],
})
export class TableKeywordsComponent {
  protected keywords$: Observable<Keyword[]>;
  constructor(private readonly treeUsecases: TreeUsecases) {
    this.keywords$ = this.treeUsecases
      .selectedTreeNodeChanges()
      .pipe(map((treeNode: TreeNode | undefined) => valueAsArray(treeNode?.keywords)));
  }
}
