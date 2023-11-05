export interface ConfigurationFilterDto {
  id?: number;
  name: string;
  minDate?: string;
  maxDate?: string;
  minPrice?: number;
  maxPrice?: number;
  search: string;
  selectedCategories: string[];
}
