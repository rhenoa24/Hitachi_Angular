import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environment/environment';
import { Social } from '../models/social.model';
import { Observable, shareReplay } from 'rxjs';

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
  getSocials(): Observable<Social[]> {
    return this.socials$;
  }

  // -----------------------------
  // Caching
  // -----------------------------

  private socials$ = this.http.get<Social[]>(
    `${environment.apiUrl}/socials`
  ).pipe(
    shareReplay(1)  // caches the result, replays to any new subscriber
  );

}
