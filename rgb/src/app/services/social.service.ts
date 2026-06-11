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
  getSocials() {
    return this.http.get<Social[]>(
      `${environment.apiUrl}/socials`
    );
  }

  // -----------------------------
  // Caching
  // -----------------------------
  socials: Social[] = [];

  cacheLoaded = false;

  setCache(data: Social[]) {
    this.socials = data;
    this.cacheLoaded = true;
  }

  getCache() {
    return this.socials;
  }

  isCacheValid() {
    return this.cacheLoaded && this.socials.length > 0;
  }

}
