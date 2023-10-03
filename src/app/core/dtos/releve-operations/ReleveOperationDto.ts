import {ReleveRow} from "./ReleveRow";
import {Moment} from "moment";

export interface ReleveOperationDto {
  rows: ReleveRow[];
  minDate: Moment;
  maxDate: Moment;
  minPrice: number;
  maxPrice: number;
  categories: string[];
}
