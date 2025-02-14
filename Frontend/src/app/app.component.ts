import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <header>
      <h1>LHIND INTERNSHIP JAVA</h1>
    </header>
    <router-outlet></router-outlet>
  `,
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
