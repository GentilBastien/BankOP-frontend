export function dateToString(date: Date | undefined): string {
  if (date) {
    return date.toISOString().substring(0, 10);
  } else {
    return 'undefined date';
  }
}
