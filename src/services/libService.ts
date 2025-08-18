import {Book, BookGenres, Reader} from "../model/Book.js";

export interface libService {
    addBook: (book: Book) => Promise<boolean>;
    removeBook: (id:string) => Promise<string>;
    pickUpBook: (id: string, reader: Reader) => Promise<void>;
    returnBook: (id: string) => Promise<void>;
    getAllBooks:() => Promise<any[]>;
    getBooksByGenre:(genre:BookGenres) => Promise<any[]>
}