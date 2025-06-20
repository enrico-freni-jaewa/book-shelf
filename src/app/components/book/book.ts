import {Component, EventEmitter, input, output, Output} from '@angular/core';
import {BookModel} from '../../model/book-model';
import {BookEdit} from '../book-edit/book-edit';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {

  @Output()
  onDelete = new EventEmitter<BookModel>();

  onEdit = output<boolean>();

  constructor(private dialog: MatDialog) {
  }

  book = input<BookModel>();

  //TODO
  editBook() {
    let dialogRef = this.dialog.open(BookEdit, {
      height: '700px',
      width: '600px',
      data: {id: this.book()?.id}
    }).afterClosed().subscribe((isBookEdited: boolean) => this.onEdit.emit(isBookEdited));
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
