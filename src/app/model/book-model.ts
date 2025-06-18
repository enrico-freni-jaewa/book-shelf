export interface BookModel {
  id?: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  pages: number;
  isbn: string;
  available: boolean;
  score: number; // 1-5 rating (with half scores allowed)
}
