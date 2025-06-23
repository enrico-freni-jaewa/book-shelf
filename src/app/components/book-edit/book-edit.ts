import {Component, Inject, OnInit, output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BookService} from '../../service/book-service';
import {Form, FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {BookModel} from '../../model/book-model';
import {MatFormField} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-book-edit',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  standalone:true,
  templateUrl: './book-edit.html',
  styleUrl: './book-edit.css'
})
export class BookEdit implements OnInit {

  bookForm?: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private bookService: BookService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookEdit>) {
  }

  ngOnInit(): void {
    this.initForm();

    this.bookService.getBook(this.data.id).subscribe(book => {
      this.form.patchValue({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedYear: book.publishedYear,
        pages: book.pages,
        isbn: book.isbn,
        available: book.available,
        score: book.score,
      });
    });
  }

  closeModal(isBookEdited:boolean=false) {
    this.dialogRef.close(isBookEdited);
  }

  saveBook() {
    if(this.form.invalid) {
      return;
    }
    let book: BookModel = {
      id: this.data.id,
      ...this.form.value
    }
    if(book.id){
      this.bookService.updateBook(book).subscribe(() => this.closeModal(true));
    } else {
      this.bookService.addBook(book).subscribe(() => {
        this.closeModal();
      });
    }

  }

  private initForm() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      publishedYear: ['', Validators.required],
      pages: ['', Validators.required],
      isbn: ['', Validators.required],
      available: ['', Validators.required],
      score: ['', Validators.required]
    })
  }


  get form() {
    return this.bookForm as FormGroup;
  }


}
