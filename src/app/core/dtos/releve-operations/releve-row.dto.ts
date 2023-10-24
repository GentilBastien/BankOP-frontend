import { Moment } from 'moment';

export interface ReleveRowDto {
  date: Moment;
  name: string;
  price: number;
  path: string;
}
