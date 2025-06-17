import {Component, Input} from '@angular/core';
import {BookModel} from "../../model/book-model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {
  @Input() book!: BookModel;

  getStarsArray(score: number | undefined): string[] {
    if (score === undefined) {
      return Array(5).fill('empty'); // Ritorna 5 stelle vuote se il punteggio è undefined
    }
    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill('full'),
      ...Array(halfStar).fill('half'),
      ...Array(emptyStars).fill('empty')
    ];
  }
}
