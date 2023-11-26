import { Component } from '@angular/core';
import { TreeUsecases } from '../tree-usecases';
import { tap } from 'rxjs';
import { TreeNode } from '../../../core/entities/tree-table/tree-node';

@Component({
  selector: 'app-table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.scss'],
})
export class TablePanelComponent {
  protected selectedTableName: string;
  constructor(private readonly treeUsecases: TreeUsecases) {
    this.selectedTableName = '';
    this.treeUsecases
      .selectedTreeNodeChanges()
      .pipe(
        tap(
          (treeNode: TreeNode | undefined) =>
            (this.selectedTableName = treeNode ? treeNode.table.name : 'no table selected')
        )
      )
      .subscribe();
  }
}
