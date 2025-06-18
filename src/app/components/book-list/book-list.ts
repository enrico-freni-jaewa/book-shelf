import { Component, OnInit, signal } from '@angular/core';
import { BookService } from '../../service/book-service';
import { BookModel } from '../../model/book-model';
import { Book } from '../book/book';

@Component({
  selector: 'app-book-list',
  imports: [Book],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {

  books = signal<BookModel[]>([]);
  bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;

  }


  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books.set(books);
    });
  }
}
