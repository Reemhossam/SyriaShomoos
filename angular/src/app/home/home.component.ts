import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService, public router: Router) {
    if (this.authService.isAuthenticated) {
      setTimeout(() => {
        this.router.navigate(['/syria-shmoos']);
      }, 1500);
    }
  }

  login() {
    this.authService.navigateToLogin();
  }

  goToDashboard() {
    this.router.navigate(['/syria-shmoos']);
  }
}
