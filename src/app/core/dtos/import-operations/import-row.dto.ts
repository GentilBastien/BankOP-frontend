import { Moment } from 'moment';

export interface ImportRowDto {
  doublon: 'none' | 'file' | 'releve';
  date: Moment;
  name: string;
  price: number;
  path: string;
}
