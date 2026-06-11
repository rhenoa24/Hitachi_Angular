import { Component, inject } from '@angular/core';
import { Social } from '../../../models/social.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-social-card',
  imports: [],
  templateUrl: './social-card.component.html',
  styleUrl: './social-card.component.css',
})
export class SocialCardComponent {
  router = inject(Router);

  social: Social = history.state.social;
  ngOnInit() {
    //console.log(this.social)
  }

  returnToDashboard() {
    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
  }
}
