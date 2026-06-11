import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css'],
  imports: [CommonModule]
})
export class OthersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carouselViewport') carouselRef!: ElementRef<HTMLElement>;

  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  brands = [
    { name: 'Samsung', logoUrl: 'samsung.png', url: 'https://www.samsung.com' },
    { name: 'Apple', logoUrl: 'apple.png', url: 'https://www.apple.com' },
    { name: 'Windows', logoUrl: 'windows.png', url: 'https://www.microsoft.com' },
  ];

  currentIndex = 0;
  // virtualIndex: 0 = clone of last, 1..n = real items, n+1 = clone of first
  virtualIndex = 1;
  animating = false;
  slideW = 0;

  private autoplayInterval: ReturnType<typeof setInterval> | null = null;

  get extendedBrands() {
    return [this.brands[this.brands.length - 1], ...this.brands, this.brands[0]];
  }

  get trackTransform(): string {
    if (!this.slideW) return '';
    const vw = this.carouselRef.nativeElement.offsetWidth;
    const slotW = this.slideW + 16; // 8px margin each side
    const offset = vw / 2 - (this.virtualIndex + 0.5) * slotW;
    return `translateX(${offset}px)`;
  }

  get currentBrand() {
    return this.brands[this.currentIndex];
  }

  ngOnInit() {
    this.startAutoplay();
  }

  ngAfterViewInit() {
    this.slideW = Math.round(this.carouselRef.nativeElement.offsetWidth * 0.78);
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  onTransitionEnd(event: TransitionEvent) {
    if (event.propertyName !== 'transform') return;
    const n = this.brands.length;
    this.animating = false;
    if (this.virtualIndex <= 0) {
      this.virtualIndex = n;       // jump to real last
      this.currentIndex = n - 1;
    } else if (this.virtualIndex >= n + 1) {
      this.virtualIndex = 1;       // jump to real first
      this.currentIndex = 0;
    } else {
      this.currentIndex = this.virtualIndex - 1;
    }
  }

  prev() {
    if (this.animating) return;
    this.animating = true;
    this.virtualIndex--;
    this.resetAutoplay();
  }

  next() {
    if (this.animating) return;
    this.animating = true;
    this.virtualIndex++;
    this.resetAutoplay();
  }

  goTo(index: number) {
    if (this.animating) return;
    this.virtualIndex = index + 1;
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
      this.cdr.markForCheck();
    }, 3000);
  }

  private stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  private resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
