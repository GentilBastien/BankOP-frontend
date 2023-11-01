import { ReleveRowDto } from './releve-row.dto';

export interface ReleveOperationDto {
  rows: ReleveRowDto[];
  minDate: string;
  maxDate: string;
  minPrice: number;
  maxPrice: number;
  categories: string[];
}
