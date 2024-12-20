import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string = 'mediumDate'): any {
    if (value) {
      return this.datePipe.transform(value, format, 'fr');
    }
    return '';
  }

}
