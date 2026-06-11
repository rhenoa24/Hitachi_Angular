import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule,
    LoadingComponent
  ],
})
export class LoginComponent {

  // -----------------------------
  // Dependency Injection
  // -----------------------------
  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  // -----------------------------
  // UI State (multi-step login flow)
  // -----------------------------
  protected step: 'username' | 'otp' = 'username';
  protected isLoading: boolean = false;
  protected loadingText: string = '';

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

    this.isLoading = true;
    this.loadingText = "Logging In"

    // Trigger login request
    this.authService.login(payload).subscribe({
      next: (res) => {
        // Persist session data
        localStorage.setItem('user', JSON.stringify(res));

        this.isLoading = false;

        // Navigate to dashboard after success
        this.router.navigate(['/dashboard']);

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.step = 'username';
        this.resetFields();

        console.error('Login failed:', err);

        this.cdr.detectChanges();
      }
    });

  }

  resetFields() {
    this.loginForm.reset()
  }
}
