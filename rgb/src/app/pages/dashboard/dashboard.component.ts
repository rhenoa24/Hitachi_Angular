import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SocialService } from '../../services/social.service';
import { AuthService } from '../../services/auth.service';
import { Social } from '../../models/social.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { Subscription } from 'rxjs';
import { SocialCardComponent } from '../../shared/components/social-card/social-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [LoadingComponent, SocialCardComponent]
})
export class DashboardComponent implements OnInit {

  // -----------------------------
  // Dependency Injection (modern inject API)
  // -----------------------------
  private socialService = inject(SocialService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private dashboardSub?: Subscription;


  // Used to manually trigger UI update when Angular doesn't auto-detect changes
  // (usually not needed unless using OnPush or external async patterns)
  private cdr = inject(ChangeDetectorRef);

  // -----------------------------
  // Component State
  // -----------------------------
  protected socials: Social[] = [];     // Stores API response
  protected isLoading: boolean = true;   // Loading state for UI
  protected loadingText: string = '';

  protected userId: string = '';
  protected userName: string = '';
  protected profilePicture: string = '';

  // -----------------------------
  // Lifecycle Hook
  // -----------------------------
  ngOnInit(): void {

    this.loadingText = "Fetching Data"

    const session = this.authService.getSession();

    if (session) {
      this.userId = session.userId;
      this.userName = session.userName;
      this.profilePicture = session.profilePicture;
    }

    this.dashboardSub = this.socialService.getSocials().subscribe({
      next: (data: Social[]) => {

        // Assign fetched data to state
        this.socials = data;

        // Stop loading indicator
        this.isLoading = false;

        // Force UI refresh (only needed in special cases)
        this.cdr.detectChanges();
      },

      error: (err) => {

        // Stop loading even if request fails
        this.isLoading = false;

        // Optional: log error for debugging
        console.error('Failed to load socials:', err);

        this.cdr.detectChanges();
      }
    });
  }

  // -----------------------------
  // Actions
  // -----------------------------
  logout(): void {

    this.isLoading = true;
    this.loadingText = "Logging Out"

    // Clear authentication/session state
    this.authService.logout();

    // Redirect to login after delay (likely for UX feedback)
    setTimeout(() => {
      this.isLoading = false
      this.router.navigate(['/login']);
    }, 3000);
  }

  ngOnDestroy() {
    this.dashboardSub?.unsubscribe();
  }
}
