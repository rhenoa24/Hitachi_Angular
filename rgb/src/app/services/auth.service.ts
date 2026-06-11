import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from '@angular/core';
import { LoginRequest } from "../models/login-request.model";
import { LoginResponse } from "../models/login-response.model";
import { environment } from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient)

  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/login`,
      payload,
      {
        headers: { CLIENT_ID: 'rgbexam' }
      }
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
