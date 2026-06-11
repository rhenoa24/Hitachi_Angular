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
  // Fetch all social records
  // -----------------------------
  getSocials() {

    return this.http.get<Social[]>(
      `${environment.apiUrl}/socials`
    );
  }
}
