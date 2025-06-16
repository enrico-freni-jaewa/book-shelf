import { Component } from '@angular/core';
import { BookList } from './components/book-list/book-list';

@Component({
  selector: 'app-root',
  imports: [BookList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'book-shelf'

  // constructor(private bookService: BookService) {
  //
  //   bookService.getBooks().subscribe(books => {
  //     console.log(books);
  //   })

  // }

}
