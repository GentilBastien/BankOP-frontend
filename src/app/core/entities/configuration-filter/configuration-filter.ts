export interface ConfigurationFilter {
  id?: number;
  name?: string;
  minDate?: Date;
  maxDate?: Date;
  minPrice?: number;
  maxPrice?: number;
  search: string;
  selectedCategories: string[];
}

export const DEFAULT_CONFIGURATION_FILTER = (): ConfigurationFilter => ({
  id: undefined,
  name: undefined,
  minDate: undefined,
  maxDate: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  search: '',
  selectedCategories: [],
});

export function equals(filter1: ConfigurationFilter, filter2: ConfigurationFilter): boolean {
  const keys1: string[] = Object.keys(filter1);
  const keys2: string[] = Object.keys(filter2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (
      !keys2.includes(key) ||
      filter1[key as keyof ConfigurationFilter] !== filter2[key as keyof ConfigurationFilter]
    ) {
      return false;
    }
  }
  return true;
}

export function isDefaultConfigurationFilter(filter: ConfigurationFilter): boolean {
  const defFilter: ConfigurationFilter = DEFAULT_CONFIGURATION_FILTER();
  return (
    filter.id === defFilter.id &&
    filter.name === defFilter.name &&
    filter.minDate === defFilter.minDate &&
    filter.maxDate === defFilter.maxDate &&
    filter.minPrice === defFilter.minPrice &&
    filter.maxPrice === defFilter.maxPrice &&
    filter.search === defFilter.search &&
    filter.selectedCategories === defFilter.selectedCategories
  );
}
