import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookModel } from '../../model/book-model';
import { BookService } from '../../service/book-service';
import {Book} from '../book/book';

@Component({
  selector: 'app-book-list',
  imports: [
    FormsModule, Book
  ],
  standalone:true,
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})

export class BookList implements OnInit {
  books = signal<BookModel[]>([]);
  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe(res => this.books.set(res));
  }

}
