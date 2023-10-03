import {Moment} from "moment";

export interface HistoricFilter {
  minDate?: Moment;
  maxDate?: Moment;
  minPrice?: number;
  maxPrice?: number;
  search: string;
  selectedCategories: string[];
}

export const DEFAULT_HISTORIC_FILTER = (): HistoricFilter => ({
  minDate: undefined,
  maxDate: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  search: '',
  selectedCategories: []
});
