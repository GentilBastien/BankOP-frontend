export interface PriceTableDto {
  tableName: string;
  depth: number;
  yearPrices: number[];
  monthYearPrices: number[][];
  cumulatedYearPrices: number[];
  cumulatedMonthYearPrices: number[][];
  children: PriceTableDto[];
  expanded: boolean;
  computedPrices: number[];
}
