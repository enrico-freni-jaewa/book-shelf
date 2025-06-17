import {Component, OnInit, signal} from '@angular/core';
import {BookModel} from '../../model/book-model';
import {BookService} from '../../service/book-service';
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

  constructor(private readonly bookService: BookService) {
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => this.books.set(books));
  }

}
