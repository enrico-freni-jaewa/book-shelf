import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "book-list",
    pathMatch: 'full'
  },
  {
    path: "book-list",
    component: BookList
  }
]; // definisce gli URLs

