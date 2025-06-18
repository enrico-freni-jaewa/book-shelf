import {Component, input} from '@angular/core';
import {BookModel} from '../../model/book-model';
import {NgStyle} from '@angular/common';
import {BookEdit} from '../book-edit/book-edit';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-book',
  imports: [
    NgStyle
  ],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {

  constructor(private dialog: MatDialog) {
  }

  book = input<BookModel>();

  editBook() {
    let dialogRef = this.dialog.open(BookEdit, {
      height: '700px',
      width: '600px',
      data: {id: this.book()?.id}
    });
  }

  deleteBook() {

  }

}
