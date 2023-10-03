import {Moment} from "moment";

export interface ReleveRow {
  date: Moment;
  name: string;
  price: number;
  path: string;
}
