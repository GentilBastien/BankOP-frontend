import {TableDto} from "../TableDto";

export interface TableNodeDto {
  tableDTO: TableDto;
  children: TableNodeDto[];
}
