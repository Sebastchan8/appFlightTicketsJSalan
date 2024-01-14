import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FlightsService } from './services/flights.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService,
    private router: Router) { }

  getAuth() {
    return this.authService.isLoggedIn()
  }

  getType() {
    return this.authService.type()
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
