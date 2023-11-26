import { TableDto } from '../table.dto';
import { KeywordDto } from '../keyword.dto';
import { OperationDto } from '../operation.dto';

export interface TreeNodeDto {
  table: TableDto;
  keywords?: KeywordDto[];
  operations?: OperationDto[];
  children?: TreeNodeDto[];
}
