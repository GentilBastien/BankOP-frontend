import { TableDto } from '../table.dto';

export interface TableNodeDto {
  tableDTO: TableDto;
  children: TableNodeDto[];
}
