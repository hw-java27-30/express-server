import {libService} from "./libService.js";
import {Book, BookGenres} from "../model/Book.js";

export class LibServiceImplSQL implements libService{
    addBook(book: Book): boolean {
        return false;
    }

    getAllBooks(): Book[] {
        return [];
    }

    getBooksByGenre(genre: BookGenres): Book[] {
        return [];
    }

    pickUpBook(id: string, reader: string): void {
    }

    removeBook(id: string): Book {
        return undefined;
    }

    returnBook(id: string): void {
    }
}