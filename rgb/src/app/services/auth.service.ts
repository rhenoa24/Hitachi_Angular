import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // -----------------------------
  // Dependencies
  // -----------------------------
  private http = inject(HttpClient);
  private router = inject(Router);

  // -----------------------------
  // Global UI state (can be used by loading component)
  // -----------------------------
  loading = signal(false);
  loadingMessage = signal('');

  // -----------------------------
  // Login API call
  // -----------------------------
  login(payload: LoginRequest) {

    // Set global loading state BEFORE request
    this.loading.set(true);
    this.loadingMessage.set('Logging you in...');

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/login`,
      payload
    );
  }

  // -----------------------------
  // Post-login success handler
  // -----------------------------
  confirmLogin(response: LoginResponse): void {

    // Persist session
    localStorage.setItem('user', JSON.stringify(response));

    // Reset UI state
    this.loading.set(false);

    // Navigate user to main app
    this.router.navigate(['/dashboard']);
  }

  // -----------------------------
  // Logout flow
  // -----------------------------
  logout(): void {

    this.loading.set(true);
    this.loadingMessage.set('Logging you out...');

    // Clear session immediately
    localStorage.removeItem('user');

    // Simulated delay (UX effect only)
    setTimeout(() => {

      this.loading.set(false);
      this.router.navigate(['/login']);

    }, 3000);
  }

  // -----------------------------
  // Auth guard helper
  // -----------------------------
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
