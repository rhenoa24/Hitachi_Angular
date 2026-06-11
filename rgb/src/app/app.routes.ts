import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoginStatusComponent } from './pages/login-status/login-status.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
    path: 'loading',
    component: LoginStatusComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },

];
