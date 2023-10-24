import { ReleveRowDto } from './releve-row.dto';
import { Moment } from 'moment';

export interface ReleveOperationDto {
  rows: ReleveRowDto[];
  minDate: Moment;
  maxDate: Moment;
  minPrice: number;
  maxPrice: number;
  categories: string[];
}
