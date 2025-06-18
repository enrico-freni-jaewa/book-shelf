import { Component, input } from '@angular/core';
import { BookModel } from '../../model/book-model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-book',
  imports: [NgStyle],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {
  book = input<BookModel>();

  get scoreArray() {
    return Array.from({ length: Math.floor(this.book()?.score || 0) }, (_, i) => i);
  }
  get scoreHalf() {
    return (this.book()?.score || 0) % 1 !== 0;
  }
}
