import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appHighlightAppointment]'
})
export class HighlightAppointmentDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set appHighlightAppointment(dateString: string | undefined) {
    if (dateString) {
      const currentDate = new Date();
      const appointmentDate = new Date(dateString);

      // Vérifiez si la date est valide
      if (!isNaN(appointmentDate.getTime())) {

        // Difference en jours entre la date du rendez-vous et la date du jour
        const timeDifference = appointmentDate.getTime() - currentDate.getTime();
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        // Vérifiez si le rendez-vous est dans les 7 prochains jours
        if (daysDifference >0 && daysDifference <= 7) {
          this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
        } 
        else if(daysDifference >-1 && daysDifference < 1) {
          this.renderer.setStyle(this.el.nativeElement, 'background-color', 'orange');
        }
        else {
          this.renderer.removeStyle(this.el.nativeElement, 'background-color');
        }
      }
    }
  }

}
