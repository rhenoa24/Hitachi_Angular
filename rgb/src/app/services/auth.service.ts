import { HttpClient } from "@angular/common/http";
import { Injectable } from "../../../node_modules/@angular/core/types/core";
import { inject } from "../../../node_modules/@angular/core/types/primitives-di";
import { environment } from "../environment/environment";
import { LoginRequest } from "../models/login-request.model";
import { LoginResponse } from "../models/login-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/login`,
      payload
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
