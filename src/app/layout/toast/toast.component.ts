// toast.component.ts
import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="isVisible" [@toastAnimation]="animationState" class="toast">
      {{ message }}
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: white;
      color: #333;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      max-width: 300px;
      word-wrap: break-word;
    }
  `],
  animations: [
    trigger('toastAnimation', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0) translateX(0)'
      })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() duration: number = 3000;

  isVisible: boolean = false;
  animationState: 'visible' | 'hidden' = 'visible';
  private timeoutId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.show();
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

  show() {
    this.isVisible = true;
    this.animationState = 'visible';
    this.cdr.detectChanges();

    this.timeoutId = setTimeout(() => {
      this.hide();
    }, this.duration);
  }

  hide() {
    this.isVisible = false;
    this.cdr.detectChanges();
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}