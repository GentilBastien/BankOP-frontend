import { Pipe, PipeTransform } from '@angular/core';
import { dateToString } from '../utils/utils';

@Pipe({
  name: 'formatDate',
})
export class DatePipe implements PipeTransform {
  transform(value: Date | undefined): string {
    return dateToString(value);
  }
}
