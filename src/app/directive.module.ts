import { NgModule } from '@angular/core';
import { HighlightAppointmentDirective } from './directives/highlight-appointment.directive';

@NgModule({
  declarations: [
  HighlightAppointmentDirective
  ],
  exports: [
    HighlightAppointmentDirective
  ],
})
export class DirectiveModule { }