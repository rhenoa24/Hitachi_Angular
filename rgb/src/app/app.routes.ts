import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { SocialCardComponent } from './shared/components/social-card/social-card.component';
import { SocialViewerComponent } from './shared/components/social-viewer/social-viewer.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent
  },
  {
    path: 'social/:name',
    canActivate: [authGuard],
    component: SocialCardComponent
  },
  {
    path: 'social/:name/view',
    canActivate: [authGuard],
    component: SocialViewerComponent
  }

];
