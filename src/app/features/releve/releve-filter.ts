import {Moment} from "moment";

export interface ReleveFilter {
  name?: string;
  minDate?: Moment;
  maxDate?: Moment;
  minPrice?: number;
  maxPrice?: number;
  search: string;
  selectedCategories: string[];
}

export const DEFAULT_HISTORIC_FILTER = (): ReleveFilter => ({
  name: undefined,
  minDate: undefined,
  maxDate: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  search: '',
  selectedCategories: []
});
