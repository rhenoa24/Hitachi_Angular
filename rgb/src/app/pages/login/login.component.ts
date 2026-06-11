import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {

  // -----------------------------
  // Dependency Injection
  // -----------------------------
  private router = inject(Router);
  private authService = inject(AuthService);

  // -----------------------------
  // UI State (multi-step login flow)
  // -----------------------------
  protected step: 'username' | 'otp' = 'username';

  // -----------------------------
  // Reactive Form
  // -----------------------------
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
  });

  // -----------------------------
  // Step 1: Username submission
  // -----------------------------
  submitUsername(): void {

    // Currently only simulating step progression
    // Ideally: call API to validate username first
    this.step = 'otp';
  }

  // -----------------------------
  // Step 2: OTP submission
  // -----------------------------
  submitOtp(): void {

    // Build payload safely from form values
    const payload: LoginRequest = {
      userName: this.loginForm.controls.userName.value,
      otp: this.loginForm.controls.otp.value
    };

    // Trigger login request
    this.authService.login(payload).subscribe({
      next: (res) => {

        // Persist session data
        localStorage.setItem('user', JSON.stringify(res));

        // Reset loading state (depends on your AuthService design)
        this.authService.loading.set(false);

        // Navigate to dashboard after success
        this.router.navigate(['/dashboard']);
      },

      error: (err) => {

        console.error('Login failed:', err);

        // Reset loading state
        this.authService.loading.set(false);
      }
    });
  }
}
