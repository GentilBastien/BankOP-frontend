import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeStore } from './tree-store';
import { TreeNode } from '../../core/entities/tree-table/tree-node';

@Injectable()
export class TreeUsecases {
  constructor(private readonly treeStore: TreeStore) {}

  public refreshTreeNode(): Observable<void> {
    return this.treeStore.refreshTreeNode();
  }

  public treeNodeChanges(): Observable<TreeNode> {
    return this.treeStore.treeNode$;
  }

  public selectedTreeNodeChanges(): Observable<TreeNode | undefined> {
    return this.treeStore.selectedTreeNode$;
  }

  public changeSelectedTreeNode(selectedTreeNode: TreeNode | undefined): void {
    this.treeStore.changeSelectedTreeNode(selectedTreeNode);
  }

  public add(): void {
    this.treeStore.add();
  }

  public rename(newName: string): void {
    this.treeStore.rename(newName);
  }

  public delete(): void {
    this.treeStore.delete();
  }
}
