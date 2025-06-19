import {Component, OnInit, signal} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {BookModel} from '../../model/book-model';
import {BookService} from '../../service/book-service';
import { BookEdit } from '../book-edit/book-edit';
import {Book} from '../book/book';

@Component({
  selector: 'app-book-list',
  imports: [
    Book
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {

  books = signal<BookModel[]>([]);

  constructor(private readonly bookService: BookService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => this.books.set(books));
  }

  deleteBook(book: BookModel): void {
    if(!book?.id){
      console.debug("Can't delete book with id");
      return;
    }

    this.bookService.deleteBook(book.id).subscribe(() => {
      console.log(`Book with id ${book.id}`);
      this.bookService.getBooks().subscribe(books => this.books.set(books));

    })

  }

  addBook() {
    let dialogRef = this.dialog.open(BookEdit, {
      height: '700px',
      width: '600px',
      data: {}
    }).afterClosed().subscribe(() => {
        this.bookService.getBooks().subscribe(books => this.books.set(books));
    });
  }
}
