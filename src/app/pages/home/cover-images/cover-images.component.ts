import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover-images',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cover-images.component.html',
  styleUrl: './cover-images.component.scss'
})
export class CoverImagesComponent implements OnInit {
  @Input() coverImageUrls!: string[];
  currentIndex: number = 0;
  timer: any;

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.coverImageUrls.length;
    }, 6000); // Timer will increment every 1 second
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
