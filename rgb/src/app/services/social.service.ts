import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../environment/environment';
import { Social } from '../models/social.model';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  // -----------------------------
  // Dependency Injection
  // -----------------------------
  private http = inject(HttpClient);

  // -----------------------------
  // API Headers (centralized idea)
  // -----------------------------
  // NOTE:
  // If multiple services use CLIENT_ID, move this to an HttpInterceptor later.
  private readonly headers = {
    CLIENT_ID: 'rgbexam'
  };

  // -----------------------------
  // Fetch all social records
  // -----------------------------
  getSocials() {

    return this.http.get<Social[]>(
      `${environment.apiUrl}/socials`
    );
  }
}
