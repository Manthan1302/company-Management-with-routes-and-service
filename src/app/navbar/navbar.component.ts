import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() role: string | null = null;
  constructor(private route: Router) { }
  logout() {
    localStorage.removeItem('loggedInUser');
    this.route.navigate(['/'])
  }
}
