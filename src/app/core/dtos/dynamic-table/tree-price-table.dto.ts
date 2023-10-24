import { PriceTableDto } from './price-table.dto';

export interface TreePriceTableDto {
  root?: PriceTableDto;
  years: number[];
}
