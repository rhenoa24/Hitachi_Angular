import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core/primitives/di';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-status',
  imports: [],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent {

  protected authService: AuthService = inject(AuthService)
  protected router: Router = inject(Router)

  canActivate(): boolean {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

;}
