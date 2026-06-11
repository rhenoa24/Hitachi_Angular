import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly defaultTheme = 'default';

  getTheme(): string {
    const storedTheme = localStorage.getItem(this.storageKey);
    return storedTheme ? storedTheme : this.defaultTheme;
  }

  setTheme(theme: string): void {
    localStorage.setItem(this.storageKey, theme);
  }
}
