import {Component, OnInit, signal} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {BookModel} from '../../model/book-model';
import {BookService} from '../../service/book-service';
import { BookEdit } from '../book-edit/book-edit';
import {Book} from '../book/book';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarRow} from '@angular/material/toolbar';
import {MatFormField} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-book-list',
  imports: [
    Book,
    MatGridListModule,
    MatButtonModule,
    MatToolbarRow,
    MatFormField,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  standalone:true,
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {

  books = signal<BookModel[]>([]);
  filteredBooks = signal<BookModel[]>([]);
  searchQuery: string = '';

  constructor(private readonly bookService: BookService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books.set(books);
      this.filteredBooks.set(books)});
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
      height: '500px',
      width: '800px',
      data: {}
    }).afterClosed().subscribe(() => {
      this.bookService.getBooks().subscribe(books => this.books.set(books));
    });
  }

  updateBookList(isBookEdited:boolean){
    if (isBookEdited) {
      this.bookService.getBooks().subscribe(books => this.books.set(books));
    }
  }

  filterBooks(): void{
    const query = this.searchQuery.toLowerCase();
    this.filteredBooks.set(
      this.books().filter(book => book.title.toLowerCase().includes(query))
    );

  }
}
