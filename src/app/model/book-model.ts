export interface BookModel {
  id?: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  pages: number;
  isbn: string;
  available: boolean;
  //da 1 a 5, con valori 0.5
  score: number;
}
