import { HttpClient } from "../HttpClient/HttpClient";
import { Book } from "../models/Book";

export interface BooksSource {
  getBook(searchTerm: string): Promise<Book>;
}

export const GoogleApiConnector = (httpClient: HttpClient) => {
  const prepareUrl = (searchTerm: string) => {
    const sourceUrl = new URL("https://www.googleapis.com/books/v1/volumes");
    sourceUrl.searchParams.append("q", searchTerm);
    sourceUrl.searchParams.append("maxResults", "1");
    return sourceUrl.toString();
  };
  return {
    async getBook(searchTerm: string) {
      const booksEndpoint = prepareUrl(searchTerm);
      const { items } = await httpClient.get<{
        items: { id: string; volumeInfo: { title: string } }[];
      }>(booksEndpoint);
      const bookInfo = items[0];
      return { id: bookInfo.id, title: bookInfo.volumeInfo.title };
    },
  };
};
