import { Component, OnInit, inject } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Social } from '../../../models/social.model';

@Component({
  selector: 'app-social-viewer',
  imports: [],
  templateUrl: './social-viewer.component.html',
  styleUrl: './social-viewer.component.css',
})
export class SocialViewerComponent implements OnInit {
  social: Social = history.state.social;
  embedUrl!: SafeResourceUrl;

  private router = inject(Router)
  private sanitizer = inject(DomSanitizer)

  ngOnInit() {
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.social.webUrl);
  }

  goBack() {
    this.router.navigate(['/social', this.social.name.toLowerCase()], {
      state: { social: this.social }
    });
  }
}
