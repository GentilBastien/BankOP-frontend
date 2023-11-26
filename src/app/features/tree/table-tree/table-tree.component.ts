import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../../core/entities/tree-table/tree-node';
import { TreeUsecases } from '../tree-usecases';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'table-tree',
  templateUrl: './table-tree.component.html',
  styleUrls: ['./table-tree.component.scss'],
})
export class TableTreeComponent {
  protected treeControl: NestedTreeControl<TreeNode> = new NestedTreeControl<TreeNode>(node => node.children);
  protected dataSource: MatTreeNestedDataSource<TreeNode> = new MatTreeNestedDataSource<TreeNode>();
  protected selectedTreeNode$: Observable<TreeNode | undefined>;

  constructor(private readonly treeUsecases: TreeUsecases) {
    this.treeUsecases
      .refreshTreeNode()
      .pipe(
        switchMap(() => this.treeUsecases.treeNodeChanges()),
        tap((treeNode: TreeNode) => (this.dataSource.data = [treeNode]))
      )
      .subscribe();
    this.selectedTreeNode$ = this.treeUsecases.selectedTreeNodeChanges();
  }

  protected hasChild = (_: number, node: TreeNode): boolean => !!node.children && node.children.length > 0;
  protected isSelectedTreeNode = (node: TreeNode, selectedTable: TreeNode | null | undefined): boolean =>
    node === selectedTable;

  protected selectRow(node: TreeNode): void {
    this.treeUsecases.changeSelectedTreeNode(node);
  }
}
