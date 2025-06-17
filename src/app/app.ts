import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BookService} from './service/book-service';
import { BookList } from './components/book-list/book-list'; // percorso corretto


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookList],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'book-shelf'

  constructor(private bookService: BookService) {

       bookService.getBooks().subscribe(books => {
       console.log(books);
     })

   }

}
