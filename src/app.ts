import { BooksSource, GoogleApiConnector } from "./BooksSource/BooksSource";
import { BooksCache, InMemoryCache } from "./Cache/BooksCache";
import { AxiosHttpClient } from "./HttpClient/HttpClient";

const BookStore = (booksSource: BooksSource, booksCache: BooksCache) => ({
  getBook: async (searchTerm: string) => {
    try {
      return booksCache.get(searchTerm);
    } catch {
      const book = await booksSource.getBook(searchTerm);
      booksCache.save(searchTerm, book);
      return book;
    }
  },
});

const httpClient = AxiosHttpClient();
const booksSource = GoogleApiConnector(httpClient);
const booksCache = InMemoryCache();
const app = BookStore(booksSource, booksCache);

const run = async () => {
  const searchTerm = "cat";
  console.time("firstCall");
  const result = await app.getBook(searchTerm);
  console.log(result);
  console.timeEnd("firstCall");
  console.time("secondCall");
  const secondResult = await app.getBook(searchTerm);
  console.log(secondResult);
  console.timeEnd("secondCall");
};

run().then((res) => console.log("End of lesson"));
