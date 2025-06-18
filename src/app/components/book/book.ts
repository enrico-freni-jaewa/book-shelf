import { Component, input } from '@angular/core';
import { BookModel } from '../../model/book-model';
import { NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BookEdit } from '../book-edit/book-edit';
import { BookService } from '../../service/book-service';

@Component({
  selector: 'app-book',
  imports: [NgStyle],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {

  constructor(private dialog: MatDialog, private bookService: BookService) { }

  book = input<BookModel>();

  editBook() {
    this.dialog.open(BookEdit, {
      height: '400px',
      width: '600px',
      data: { bookId: this.book()?.id }
    });
  }

  deleteBook() {
    if (confirm(`Are you sure you want to delete the book "${this.book()?.title}"?`)) {
      const id = this.book()?.id;
      if (id) {
        this.bookService.deleteBook(id).subscribe({
          next: () => {
          },
          error: (error) => {
            console.error('Error deleting book:', error);
          }
        });
      }
    }
  }

  get scoreArray() {
    return Array.from({ length: Math.floor(this.book()?.score || 0) }, (_, i) => i);
  }
  get scoreHalf() {
    return (this.book()?.score || 0) % 1 !== 0;
  }
}
