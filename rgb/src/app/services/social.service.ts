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
  // Get all social records
  // -----------------------------
  socials: Social[] = [];

  getSocials() {
    return this.http.get<Social[]>(
      `${environment.apiUrl}/socials`
    );
  }

  // -----------------------------
  // Cache
  // -----------------------------
  setCache(data: Social[]) {
    this.socials = data;
  }

  getCache() {
    return this.socials;
  }

  // -----------------------------
  // Get single social by ID
  // -----------------------------
  getSocialByName(name: string) {
    const cached = this.socials.find(x => x.name === name);

    if (cached) {
      return cached;
    }

    // fallback if user refreshes page or cache is empty
    return this.http.get<Social>(
      `${environment.apiUrl}/socials/${name}`
    );
  }

}
