import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../environment/environment";
import { Social } from "../models/social.model";

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private http: HttpClient = inject(HttpClient);

  getSocials() {
    return this.http.get<Social[]>(
      `${environment.apiUrl}/socials`
    );
  }
}
