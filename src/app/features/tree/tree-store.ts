import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { DEFAULT_TREE_NODE, TreeNode } from '../../core/entities/tree-table/tree-node';
import { TreeService } from '../../core/services/tree.service';
import { Tree } from '../../core/entities/tree-table/tree';
import { returnVoid } from '../../shared/custom-operators/ReturnVoid';

@Injectable()
export class TreeStore {
  private treeNodeSubject: BehaviorSubject<TreeNode> = new BehaviorSubject<TreeNode>(DEFAULT_TREE_NODE());
  public treeNode$: Observable<TreeNode> = this.treeNodeSubject.asObservable();

  private selectedTreeNodeSubject: BehaviorSubject<TreeNode | undefined> = new BehaviorSubject<TreeNode | undefined>(
    undefined
  );
  public selectedTreeNode$: Observable<TreeNode | undefined> = this.selectedTreeNodeSubject.asObservable();

  constructor(private readonly treeService: TreeService) {}

  public refreshTreeNode(): Observable<void> {
    return this.treeService.fetch().pipe(
      map((tree: Tree) => tree.root),
      tap((treeNode: TreeNode) => this.treeNodeSubject.next(treeNode)),
      returnVoid()
    );
  }

  public changeSelectedTreeNode(selectedTreeNode: TreeNode | undefined): void {
    if (this.selectedTreeNodeSubject.getValue() === selectedTreeNode) {
      this.selectedTreeNodeSubject.next(undefined);
    } else {
      this.selectedTreeNodeSubject.next(selectedTreeNode);
    }
  }
}
