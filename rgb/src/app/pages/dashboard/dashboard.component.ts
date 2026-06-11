import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SocialService } from '../../services/social.service';
import { Router } from '@angular/router';
import { Social } from '../../models/social.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  private socialService: SocialService = inject(SocialService)
  private router: Router = inject(Router)
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  private authService: AuthService = inject(AuthService)

  protected socials: Social[] = []
  protected isLoading: boolean = true;

  ngOnInit() {
    this.socialService.getSocials().subscribe({
      next: (data) => {
        this.socials = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  logout() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }

}
