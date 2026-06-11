import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core/primitives/di';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent {}
