import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-top-bar',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
