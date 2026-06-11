import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  // -----------------------------
  // Login API call
  // -----------------------------
  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/login`,
      payload
    );
  }

  // -----------------------------
  // Save session after login success
  // -----------------------------
  setSession(response: LoginResponse): void {
    localStorage.setItem('user', JSON.stringify(response));
  }

  // -----------------------------
  // Logout
  // -----------------------------
  logout(): void {
    localStorage.removeItem('user');
  }

  // -----------------------------
  // Check auth state
  // -----------------------------
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

}
