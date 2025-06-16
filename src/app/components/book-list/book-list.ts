import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../model/book-model';
import { BookService } from '../../service/book-service';

@Component({
  selector: 'app-book-list',
  imports: [
    FormsModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  books = signal<Book[]>([]);

  editing = signal(false);
  deleting = signal(false);
  creating = signal(false);
  editModel: Book = {title: '', author: '', genre: '', publishedYear: 0, pages: 0, isbn: '', available: true};
  deleteModel!: Book;
  newBook: Partial<Book> = {title: '', author: ''};

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe(res => this.books.set(res));
  }

  openEditModal(book: Book) {
    this.editModel = {...book};
    this.editing.set(true);
  }

  openDeleteModal(book: Book) {
    this.deleteModel = book;
    this.deleting.set(true);
  }

  openCreateModal() {
    this.newBook = {title: '', author: ''};
    this.creating.set(true);
  }

  saveEdit() {
    this.bookService.updateBook(this.editModel).subscribe(() => {
      this.bookService.getBooks().subscribe(res => this.books.set(res));
      this.closeModal();
    });
  }

  saveNewBook() {
    const bookToAdd: Book = {
      title: this.newBook.title || '',
      author: this.newBook.author || '',
      genre: this.newBook.genre || '',
      publishedYear: this.newBook.publishedYear || 0,
      pages: this.newBook.pages || 0,
      isbn: this.newBook.isbn || '',
      available: this.newBook.available || true
    };
    this.bookService.addBook(bookToAdd).subscribe(newBook => {
      this.books.update(books => [...books, newBook]);
      this.closeModal();
    });
  }

  confirmDelete() {
    if (!this.deleteModel.id) {
      console.log('can\'t delete an entity without the relative id');
      return;
    }
    this.bookService.deleteBook(this.deleteModel.id).subscribe(() => {
      this.bookService.getBooks().subscribe(res => this.books.set(res));
      this.closeModal();
    });
  }

  closeModal() {
    this.editing.set(false);
    this.deleting.set(false);
    this.creating.set(false);
  }
}

