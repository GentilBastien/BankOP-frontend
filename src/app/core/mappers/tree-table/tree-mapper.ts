import { AbstractMapper } from '../abstract-mapper';
import { TreeDto } from '../../dtos/tree-table/tree.dto';
import { Injectable } from '@angular/core';
import { Tree } from '../../entities/tree-table/tree';
import { TreeNodeMapper } from './tree-node-mapper';

@Injectable({
  providedIn: 'root',
})
export class TreeMapper extends AbstractMapper<TreeDto, Tree> {
  constructor(private readonly treeNodeMapper: TreeNodeMapper) {
    super();
  }
  public fromDto(dto: TreeDto): Tree {
    return {
      root: this.treeNodeMapper.fromDto(dto.root),
    };
  }

  public toDto(model: Tree): TreeDto {
    return {
      root: this.treeNodeMapper.toDto(model.root),
    };
  }
}
