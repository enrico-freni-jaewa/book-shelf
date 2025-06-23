import {Component, EventEmitter, input, output, Output} from '@angular/core';
import {BookModel} from '../../model/book-model';
import {NgStyle} from '@angular/common';
import {BookEdit} from '../book-edit/book-edit';
import {MatDialog} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book',
  imports: [
    NgStyle,
    MatCardModule,
    MatButtonModule
  ],
  standalone:true,
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {

  @Output()
  onDelete = new EventEmitter<BookModel>();

  @Output()
  onEdit= new EventEmitter<boolean>(); //nome evento+ emettere l'evento fuori

  constructor(private dialog: MatDialog) {
  }

  book = input<BookModel>();


  editBook() {
    let dialogRef = this.dialog.open(BookEdit, {
      height: '700px',
      width: '600px',
      data: {id: this.book()?.id}
    }).afterClosed().subscribe((isBookEdited:boolean) => this.onEdit.emit(isBookEdited));
  }

  deleteBook() {
    this.onDelete.emit(this.book());
  }

  getStarType(positionArrayIndex: number, score?: number): 'full' | 'half' | 'empty' {
    if (!score) {
      return 'empty';
    }
    let scoreGreaterOrEqualThanIndex = positionArrayIndex <= Math.floor(score);
    if (scoreGreaterOrEqualThanIndex) {
      return 'full';
    }
    let halfStar = positionArrayIndex - 0.5 <= score;
    if (halfStar) {
      return 'half';
    }
    return 'empty';
  }

}
