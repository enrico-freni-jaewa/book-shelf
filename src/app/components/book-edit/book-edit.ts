import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookModel } from '../../model/book-model';
import { BookService } from '../../service/book-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-book-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './book-edit.html',
  styleUrl: './book-edit.css'
})
export class BookEdit implements OnInit {

  bookId: BookModel["id"];
  bookForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { bookId: BookModel["id"] }, private bookService: BookService, private fb: FormBuilder, public dialogRef: DialogRef) {
    this.bookId = data.bookId;
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      author: ['', Validators.required],
      score: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      publishedYear: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      pages: [0, [Validators.required, Validators.min(1)]],
      isbn: ['', [Validators.required, Validators.pattern(/^(97(8|9))?\d{9}(\d|X)$/)]],
      available: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.bookService.getBook(this.data.bookId!).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.title,
          genre: book.genre,
          author: book.author,
          score: book.score,
          publishedYear: book.publishedYear,
          pages: book.pages,
          isbn: book.isbn,
          available: book.available
        })
      },
      error: (error) => {
        console.error('Errore nel recupero del libro:', error);
      }
    })
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      console.error('Il modulo contiene errori di validazione');
      return;
    }

    this.bookService.updateBook({
      id: this.bookId,
      ...this.bookForm.value
    }).subscribe({
      next: () => {
        console.log('Libro aggiornato con successo');
        this.closeDialog();
      },
      error: (error) => {
        console.error('Errore nell\'aggiornamento del libro:', error);
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
