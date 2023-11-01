import { ReleveRow } from './releve-row';

export interface ReleveOperation {
  rows: ReleveRow[];
  minDate: Date;
  maxDate: Date;
  minPrice: number;
  maxPrice: number;
  categories: string[];
}
