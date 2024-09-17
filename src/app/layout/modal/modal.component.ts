import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() message!: string;
  @Input() title?: string;
  @Input() color?: string;
  @Input() button?: boolean;
  @Output() closeModal!: EventEmitter<void>;

  constructor() {
    this.closeModal = new EventEmitter<void>();
  }

  onClose() {
    this.closeModal.emit();
  }
}
