import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover-images',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cover-images.component.html',
  styleUrl: './cover-images.component.scss'
})
export class CoverImagesComponent implements OnInit {
  coverImageUrls: string[] = ['https://i.ibb.co/M9m3SKQ/bg.webp', 'https://lillianelsiehome.com/cdn/shop/files/777e35ac-1e37-4a1f-bdec-5682f6699b7a_1380x.jpg'];
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
