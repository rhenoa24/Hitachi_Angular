import { Component, Input } from '@angular/core';
import { Social } from '../../../models/social.model';

@Component({
  selector: 'app-social-card',
  imports: [],
  templateUrl: './social-card.component.html',
  styleUrl: './social-card.component.css',
})
export class SocialCardComponent {
  @Input() social!: Social;
}
