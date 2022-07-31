import { Book } from "../models/Book";

export interface BooksCache {
  get(key: string): Book;
  save(key: string, book: Book): void;
}

export const InMemoryCache = (): BooksCache => {
  const books: Map<string, Book> = new Map();
  return {
    get(key: string): Book {
      const book = books.get(key);
      if (!book) {
        throw new Error("Book not found in cache");
      }
      return book;
    },
    save(key: string, book: Book): void {
      books.set(key, book);
    },
  };
};
