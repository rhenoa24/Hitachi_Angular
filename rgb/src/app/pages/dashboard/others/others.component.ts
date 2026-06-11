import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css'],
  imports: [CommonModule]
})
export class OthersComponent implements OnInit, OnDestroy {

  private router = inject(Router)
  private cdr = inject(ChangeDetectorRef);


  brands = [
    { name: 'Samsung', logoUrl: 'samsung.png', url: 'https://www.samsung.com' },
    { name: 'Apple', logoUrl: 'apple.png', url: 'https://www.apple.com' },
    { name: 'Windows', logoUrl: 'windows.png', url: 'https://www.microsoft.com' },
  ];


  currentIndex = 0;
  private autoplayInterval: ReturnType<typeof setInterval> | null = null;  // :point_left: typed properly

  ngOnInit() {
    this.startAutoplay();  // :point_left: kicks off immediately on load
  }

  ngOnDestroy() {
    this.stopAutoplay();  // :point_left: prevents memory leak when leaving the page
  }

  get currentBrand() {
    return this.brands[this.currentIndex];
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.brands.length) % this.brands.length;
    this.resetAutoplay();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.brands.length;
    this.resetAutoplay();
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.resetAutoplay();
  }

  visitWebsite() {
    window.open(this.currentBrand.url, '_blank');
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  private startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.next();
      this.cdr.markForCheck(); // 👈 tells Angular to re-check this component
    }, 3000);
  }

  private stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;  // :point_left: always null it out after clearing
    }
  }

  private resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();  // :point_left: restart the 3s timer fresh after manual interaction
  }
}
