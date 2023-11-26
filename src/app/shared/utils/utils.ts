export function dateToString(date: Date | undefined): string {
  if (date) {
    return date.toISOString().substring(0, 10);
  } else {
    return 'undefined date';
  }
}

export function valueAsArray<T>(value?: T | T[]): T[] {
  if (!value) {
    return [];
  } else if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
}
