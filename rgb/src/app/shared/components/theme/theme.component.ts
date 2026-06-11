import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

interface ThemeItem {
  type: 'theme';
  key: string;
  label: string;
}

type ThemeOption = ThemeItem;

@Component({
  selector: 'app-theme',
  imports: [],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
})

export class ThemeComponent {
  private themeService = inject(ThemeService);
  private themeToggle: boolean = false;

  themes: ThemeOption[] = [
    { type: 'theme', key: 'special', label: 'Special Theme' },
  ];

  selectedTheme: string = 'default';

  ngOnInit(): void {
    this.selectedTheme = this.themeService.getTheme();
    this.applyTheme(this.selectedTheme);
  }

  onThemeSelect(themeKey: string): void {
    this.selectedTheme = themeKey;
    this.themeService.setTheme(themeKey);
    this.applyTheme(themeKey);
  }

  toggleTheme() {
    this.themeToggle = !this.themeToggle;

    if (this.themeToggle) {
      this.onThemeSelect('special')
    } else {
      this.onThemeSelect('default')
    }
  }


  private applyTheme(themeKey: string): void {
    document.body.className = document.body.className
      .split(' ')
      .filter(c => !c.endsWith('-theme'))
      .join(' ');

    document.body.classList.add(`${themeKey}-theme`);
  }
}
