import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { ThemeComponent } from './shared/components/theme/theme.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    const theme = this.themeService.getTheme();
    document.body.classList.add(`${theme}-theme`);
  }

}
