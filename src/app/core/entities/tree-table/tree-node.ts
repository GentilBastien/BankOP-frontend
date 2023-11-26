import { Operation } from '../operation';
import { Keyword } from '../keyword';
import { Table } from '../table';

export interface TreeNode {
  table: Table;
  keywords: Keyword[];
  operations: Operation[];
  children: TreeNode[];
}

export const DEFAULT_TREE_NODE = (): TreeNode => ({
  table: {
    name: 'no_tree_node',
    idCategory: 0,
  },
  keywords: [],
  operations: [],
  children: [],
});
