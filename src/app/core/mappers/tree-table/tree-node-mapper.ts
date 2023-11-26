import { Injectable } from '@angular/core';
import { AbstractMapper } from '../abstract-mapper';
import { TreeNodeDto } from '../../dtos/tree-table/tree-node.dto';
import { TreeNode } from '../../entities/tree-table/tree-node';
import { TableMapper } from '../table-mapper';
import { KeywordMapper } from '../keyword-mapper';
import { OperationMapper } from '../operation-mapper';
import { KeywordDto } from '../../dtos/keyword.dto';
import { OperationDto } from '../../dtos/operation.dto';
import { Operation } from '../../entities/operation';

@Injectable({
  providedIn: 'root',
})
export class TreeNodeMapper extends AbstractMapper<TreeNodeDto, TreeNode> {
  constructor(
    private readonly tableMapper: TableMapper,
    private readonly keywordMapper: KeywordMapper,
    private readonly operationMapper: OperationMapper
  ) {
    super();
  }
  public fromDto(dto: TreeNodeDto): TreeNode {
    return {
      table: this.tableMapper.fromDto(dto.table),
      keywords: !dto.keywords
        ? []
        : dto.keywords.map((keywordDto: KeywordDto) => this.keywordMapper.fromDto(keywordDto)),
      operations: !dto.operations
        ? []
        : dto.operations.map((operationDto: OperationDto) => this.operationMapper.fromDto(operationDto)),
      children: !dto.children ? [] : dto.children.map((treeNodeDto: TreeNodeDto) => this.fromDto(treeNodeDto)),
    };
  }

  public toDto(model: TreeNode): TreeNodeDto {
    return {
      table: this.tableMapper.fromDto(model.table),
      keywords: model.keywords.map((keywordDto: KeywordDto) => this.keywordMapper.toDto(keywordDto)),
      operations: model.operations.map((operation: Operation) => this.operationMapper.toDto(operation)),
      children: model.children.map((treeNode: TreeNode) => this.toDto(treeNode)),
    };
  }
}
