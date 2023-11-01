// export interface NumericDate {
//   year: number;
//   month: number;
//   day: number;
// }
//
// export function parseNumericDate(dateString: string): NumericDate {
//   const dateParts: string[] = dateString.split('-');
//   if (dateParts.length !== 3) {
//     throw Error('more than 3 parts in date');
//   }
//   const year = parseInt(dateParts[0], 10);
//   const month = parseInt(dateParts[1], 10);
//   const day = parseInt(dateParts[2], 10);
//   if (isNaN(year) || isNaN(month) || isNaN(day)) {
//     throw Error('invalid numeric values');
//   }
//   return { year, month, day };
// }
//
// export function toLiteral(date: NumericDate): string {
//   return date.year + '-' + date.month + '-' + date.day;
// }
//
// export const mapDateToNumericDate = (date: Date | undefined): NumericDate | undefined => {
//   if (date) {
//     return {
//       year: date.getFullYear(),
//       month: date.getMonth(),
//       day: date.getDate(),
//     };
//   }
//   return undefined;
// };
//
// export const mapNumericDateToDate = (date: NumericDate | undefined): Date | undefined => {
//   if (!date) {
//     return undefined;
//   } else {
//     return new Date(date.year, date.month, date.day);
//   }
// };
//
// export function smallerThan(date1: NumericDate, date2: NumericDate | undefined): boolean {
//   if (!date2) {
//     return true;
//   }
//   return date1.year < date2.year ? true : date1.month < date2.month ? true : date1.day < date2.day;
// }
//
// export function greaterThan(date1: NumericDate, date2: NumericDate | undefined): boolean {
//   if (!date2) {
//     return true;
//   }
//   return date1.year > date2.year ? true : date1.month > date2.month ? true : date1.day > date2.day;
// }
//
// export function equalsTo(date1: NumericDate | undefined, date2: NumericDate | undefined): boolean {
//   if (!date1 || !date2) {
//     return true;
//   }
//   return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
// }
