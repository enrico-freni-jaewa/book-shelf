import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
