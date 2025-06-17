import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BookModel } from '../model/book-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/books';

  getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getBook(id: string): Observable<BookModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<BookModel>(url).pipe(
      catchError(this.handleError)
    );
  }

  addBook(book: Omit<BookModel, 'id'>): Observable<BookModel> {
    return this.http.post<BookModel>(this.apiUrl, book).pipe(
      catchError(this.handleError)
    );
  }

  updateBook(book: BookModel): Observable<BookModel> {
    const url = `${this.apiUrl}/${book.id}`;
    return this.http.put<BookModel>(url, book).pipe(
      catchError(this.handleError)
    );
  }

  patchBook(id: string, partialBook: Partial<BookModel>): Observable<BookModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<BookModel>(url, partialBook).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Errore API:', error);
    return throwError(() => new Error('Errore nella comunicazione con il server.'));
  }
}
