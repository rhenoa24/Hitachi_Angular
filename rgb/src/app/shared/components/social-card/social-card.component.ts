import { Component, Input, inject } from '@angular/core';
import { Social } from '../../../models/social.model';
import { ActivatedRoute } from '@angular/router';
import { SocialService } from '../../../services/social.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-social-card',
  imports: [],
  templateUrl: './social-card.component.html',
  styleUrl: './social-card.component.css',
})
export class SocialCardComponent {

  private route = inject(ActivatedRoute)
  private socialService = inject(SocialService);

  social?: Social;

  ngOnInit() {
    const name = String(this.route.snapshot.paramMap.get('name'));

    const data = this.socialService.getSocialByName(name);

    if (data instanceof Observable) {
      data.subscribe(res => {
        this.social = res;
      });
    } else {
      this.social = data;
    }
  }

}
