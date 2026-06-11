import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from '@angular/core';
import { LoginRequest } from "../models/login-request.model";
import { LoginResponse } from "../models/login-response.model";
import { environment } from "../environment/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  loading = signal(false);
  loadingMessage = signal('');

  login(payload: LoginRequest) {
    this.loading.set(true);
    this.loadingMessage.set('Logging you in...');

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/login`,
      payload,
      { headers: { CLIENT_ID: 'rgbexam' } }
    );
  }

  confirmLogin(response: LoginResponse) {
    localStorage.setItem('user', JSON.stringify(response));

    this.loading.set(false);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.loading.set(true);
    this.loadingMessage.set('Logging you out...');

    localStorage.removeItem('user');

    setTimeout(() => {
      this.loading.set(false);
      this.router.navigate(['/login']);
    }, 3000);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
