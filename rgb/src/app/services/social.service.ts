import { HttpClient } from "@angular/common/http";
import { Injectable } from "../../../node_modules/@angular/core/types/core";
import { inject } from "../../../node_modules/@angular/core/types/primitives-di";
import { environment } from "../environment/environment";
import { Social } from "../models/social.model";

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private http = inject(HttpClient);

  getSocials() {
    return this.http.get<Social[]>(
      `${environment.apiUrl}/socials`
    );
  }
}
