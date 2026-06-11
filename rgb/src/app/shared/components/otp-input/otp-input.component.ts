import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class OtpInputComponent {
  @Input() control!: FormControl<string>;
  @ViewChild('hiddenInput') hiddenInput!: ElementRef<HTMLInputElement>;

  readonly length = 6;
  readonly digits = Array(this.length).fill(null);
  readonly doc = document;

  get value(): string {
    return this.control.value ?? '';
  }

  focusInput(): void {
    // wait for view init safety
    setTimeout(() => {
      this.hiddenInput?.nativeElement.focus();
    });
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Strip anything that's not a digit, cap at 6 chars
    const cleaned = input.value.replace(/\D/g, '').slice(0, this.length);
    input.value = cleaned;
    this.control.setValue(cleaned);
    this.control.markAsTouched();
  }



}
