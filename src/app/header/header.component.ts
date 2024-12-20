import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports:[RouterModule],
  standalone: true
})
export default class HeaderComponent {

  constructor(private authService: AuthService){

  }

  logout(){
    this.authService.logout();
    
  }
}
