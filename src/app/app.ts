import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BookList} from './components/book-list/book-list';
import {MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from '@angular/material/icon';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarRow, MatIcon, BookList],
  standalone:true,
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
