import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from '../model/book-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/books';

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getBook(id: string): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      catchError(this.handleError)
    );
  }

  addBook(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      catchError(this.handleError)
    );
  }

  updateBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${book.id}`;
    return this.http.put<Book>(url, book).pipe(
      catchError(this.handleError)
    );
  }

  patchBook(id: string, partialBook: Partial<Book>): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Book>(url, partialBook).pipe(
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
