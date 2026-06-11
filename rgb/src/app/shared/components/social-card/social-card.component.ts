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

  protected isFrameVisible: boolean = false;

  social: Social = history.state.social;
  ngOnInit() {
    //console.log(this.social)
  }

  goBack() {
    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
  }

  openViewer() {
    //// Navigate to IFrame
    //this.router.navigate(['/social', this.social.name.toLowerCase(), 'view'], {
    //  state: { social: this.social }
    //});

    // Navigate to webUrl
    window.open(this.social.webUrl, '_blank');
  }

}
