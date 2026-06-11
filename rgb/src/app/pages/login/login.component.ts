import { Component, inject } from '@angular/core';
import { LoginRequest } from '../../models/login-request.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  protected router: Router = inject(Router)
  protected authService: AuthService = inject(AuthService)

  protected username: string = ""
  protected pin: string = ""

  submitLogin() {

    const payload: LoginRequest = {
      userName: this.username,
      otp: this.pin
    };

    this.router.navigate(['/login-status']);

    this.authService.login(payload).subscribe({
      next: (response) => {

        localStorage.setItem(
          'user',
          JSON.stringify(response)
        );

        this.router.navigate(['/dashboard']);
      },
      error: () => {

        this.router.navigate(['/login']);

        alert('Invalid username or PIN');
      }
    });
  }

}
