import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conventionnedStatus'
})
export class ConventionnedStatusPipe implements PipeTransform {

  transform(conventionned?: boolean): string {
    return conventionned ? 'Yes' : 'No';
  }

}
