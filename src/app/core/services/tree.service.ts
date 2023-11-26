import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { TreeDto } from '../dtos/tree-table/tree.dto';
import { map, Observable } from 'rxjs';
import { Tree } from '../entities/tree-table/tree';
import { TreeMapper } from '../mappers/tree-table/tree-mapper';

@Injectable({
  providedIn: 'root',
})
export class TreeService extends ApiCallService<TreeDto> {
  constructor(
    httpService: HttpClient,
    private readonly treeMapper: TreeMapper
  ) {
    super('tree', httpService);
  }

  public fetch(): Observable<Tree> {
    return this.get().pipe(map((treeDto: TreeDto) => this.treeMapper.fromDto(treeDto)));
  }
}
