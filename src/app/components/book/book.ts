import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookModel} from "../../model/book-model";
import {CommonModule} from "@angular/common";
import {BookEdit} from '../book-edit/book-edit';
import {MatDialog} from '@angular/material/dialog';
import {BookService} from '../../service/book-service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {

  constructor( private dialog : MatDialog, private bookService: BookService){

  }

  @Input() book!: BookModel; //@Input?consente di passare dati da un componente genitore a un componente figlio
  @Output() bookDeleted = new EventEmitter<string>();

  getStarsArray(score: number | undefined): string[] {
    if (score === undefined) {
      return Array(5).fill('empty');
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

  editBook(){
    let dialogRef= this.dialog.open(BookEdit, {
      height: '400px',
      width: '600px',
      data: {id: this.book.id}
    })

  }

  deleteBook(){
      if (!this.book.id) {
        console.error('Book ID is undefined. Cannot delete the book.');
        return;
      }

      if (confirm(`Are you sure you want to delete the book "${this.book.title}"?`)) {
        this.bookService.deleteBook(this.book.id).subscribe(() => {
          this.bookDeleted.emit(this.book.id); // Notifica il genitore
        });
      }

  }
}
