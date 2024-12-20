import { NgModule } from '@angular/core';
import { CustomDateFormatPipe } from './pipes/custom-date-format.pipe';
import { DatePipe } from '@angular/common';
import { ConventionnedStatusPipe } from './pipes/conventionned-status.pipe';

@NgModule({
  declarations: [
    CustomDateFormatPipe,
    ConventionnedStatusPipe
    
  ],
  exports: [
    CustomDateFormatPipe,
    ConventionnedStatusPipe
   
  ],
  providers: [DatePipe],
})
export class PipesModule { }