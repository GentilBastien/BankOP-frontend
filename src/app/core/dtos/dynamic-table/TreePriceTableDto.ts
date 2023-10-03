import {PriceTableDto} from "./PriceTableDto";

export interface TreePriceTableDto {
  root?: PriceTableDto;
  years: number[];
}
