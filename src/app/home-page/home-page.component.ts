import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from '../header/header.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports:[RouterOutlet, HeaderComponent],
  standalone: true
})
export default class HomePageComponent {

}
