export interface ReleveFilter {
  name?: string;
  minDate?: Date;
  maxDate?: Date;
  minPrice?: number;
  maxPrice?: number;
  search: string;
  selectedCategories: string[];
}

export const DEFAULT_RELEVE_FILTER = (): ReleveFilter => ({
  name: undefined,
  minDate: undefined,
  maxDate: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  search: '',
  selectedCategories: [],
});

export function equals(filter1: ReleveFilter, filter2: ReleveFilter): boolean {
  const keys1: string[] = Object.keys(filter1);
  const keys2: string[] = Object.keys(filter2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!keys2.includes(key) || filter1[key as keyof ReleveFilter] !== filter2[key as keyof ReleveFilter]) {
      return false;
    }
  }
  return true;
}
