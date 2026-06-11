import { Component, inject } from '@angular/core';
import { SocialService } from '../../services/social.service';
import { Router } from '@angular/router';
import { Social } from '../../models/social.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  private socialService: SocialService = inject(SocialService)
  private router: Router = inject(Router)

  protected socials: Social[] = []
  
  ngOnInit() {

    this.socialService.getSocials().subscribe({
      next: (data) => {
        this.socials = data;
      }
    });

  }

  logout() {

    localStorage.removeItem('user');

    this.router.navigate(['/login-status']);

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);

  }

}
