import { Component, inject } from '@angular/core';
import { LoginRequest } from '../../models/login-request.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  protected router: Router = inject(Router)
  protected authService: AuthService = inject(AuthService)

  protected step: 'username' | 'otp' = 'username';
  protected username: string = ""
  protected pin: string = ""

  protected loginForm = new FormGroup({
    userName: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(24),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]
    }),
    otp: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/)
      ]
    }),
  })

  submitUsername() {
    // simulate API step 1
    this.step = 'otp';
  }

  submitOtp() {

    const payload: LoginRequest = {
      userName: this.loginForm.value.userName ?? '',
      otp: this.loginForm.value.otp ?? ''
    };

    // ALWAYS go to loading page first
    this.router.navigate(['/loading']);

    this.authService.login(payload).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));

        this.authService.loading.set(false);

        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.authService.loading.set(false);
      }
    });
  }

}
