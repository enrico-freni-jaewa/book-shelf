import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookModel } from '../../model/book-model';
import { BookService } from '../../service/book-service';
import {Book} from '../book/book';
import {BookEdit} from '../book-edit/book-edit';
import { MatDialog } from '@angular/material/dialog';
import {interval, Subscription} from 'rxjs';
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
  private pollingSubscription!: Subscription;
  constructor(private bookService: BookService,
              private dialog: MatDialog ) {
  }
  openEditDialog(bookId: string) {
    const dialogRef = this.dialog.open(BookEdit, {
      data: { id: bookId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        // Ricarica la lista dei libri
        this.loadBooks();
      }
    });
  }

  private loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books.set(books); // Assumendo che usi un signal
    });
  }

  ngOnInit() {
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.loadBooks();
    });
    this.bookService.getBooks().subscribe(res => this.books.set(res));
  }

  ngOnDestroy() {
      this.pollingSubscription?.unsubscribe();
  }

  onBookDeleted(bookId: string) {
    this.books.update(books => books.filter(book => book.id !== bookId));
  }

}
