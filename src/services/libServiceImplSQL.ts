import {libService} from "./libService.js";
import {Book, BookGenres, Reader} from "../model/Book.js";
import {pool} from "../config/libConfig.js";
import { v4 as uuidv4 } from 'uuid';
import {BookStatus} from "../model/Book.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class LibServiceImplSQL implements libService {

    async addBook(book: Book): Promise<boolean> {
        const result = await pool.query('INSERT INTO books VALUES(?,?,?,?,?)',
            [book.id, book.title, book.author, book.genre, book.status])
        console.log(result)
        if(!result)
            return Promise.resolve(false);
        else return Promise.resolve(true);
    }

    async getAllBooks(): Promise<any[]> {
        const [result] = await pool.query('SELECT * FROM books');
        console.log(result)
        if(!result)
            return Promise.resolve([])
        return Promise.resolve(result as any[]);
    }

    async getBooksByGenre(genre: BookGenres): Promise<any[]> {
        const [result] = await pool.query('SELECT * FROM books WHERE genre = ?', [genre]);
        console.log(result)
        if(!result)
            return Promise.resolve([])
        return Promise.resolve(result as any[]);
    }

    async pickUpBook(id: string, reader: Reader): Promise<void> {
        console.log(reader);
        const result_book = await pool.query('SELECT id FROM books WHERE id = ?', [id]);
        console.log(result_book);
        if(!result_book)
            return Promise.reject("book not found");
        const [status_book]: Array<any> = await pool.query('SELECT status FROM books WHERE id = ?', [id]);
        if(status_book.length === 0) return Promise.reject("something went wrong");
        console.log(status_book[0].status);
        if(status_book[0].status !== "on stock") return Promise.reject("book on hand");
        const update_status = await pool.query('UPDATE books SET status = ? WHERE id = ?',
            [BookStatus.ON_HAND, id]);
        if(!update_status) return Promise.reject("something went wrong");
        const result_reader = await pool.query('INSERT INTO readers VALUES(?,?)',
            [reader.id, reader.name])
        console.log(result_reader);
        if(!result_reader) return Promise.reject("something went wrong");
        const result_books_readers = await pool.query('INSERT INTO books_readers (id, id_book, id_reader) VALUES (?, ?, ?)',
            [uuidv4().toString(),id, reader.id])
        if(!result_books_readers) return Promise.reject("something went wrong");
        return Promise.resolve();
    }

    async removeBook(id: string): Promise<string> {
        const [result]: Array<any> = await pool.query('SELECT id FROM books WHERE id = ?', [id]);
        if(!result) return Promise.reject("Book not found");
        const [result_books_readers]: Array<any> = await pool.query('SELECT id FROM books_readers WHERE id_book = ?', [id]);
        console.log(result_books_readers[0]);
        if(!result_books_readers[0]) {
            const delete_book = await pool.query('DELETE FROM books WHERE id = ?', [id]);
            if(!delete_book) {
                return Promise.reject("something went wrong");
            }
            else return Promise.resolve('book deleted');
        }
        const [result_books_readers_id_reader]: Array<any> = await pool.query('SELECT id_reader FROM books_readers WHERE id_book = ?', [id]);
        // console.log(result_books_readers_id_reader);
        const id_reader = result_books_readers_id_reader[0].id_reader;
        const id_books_readers = result_books_readers[0].id
        const [result_delete_books_readers] = await pool.query('DELETE FROM books_readers WHERE id = ?', [id_books_readers]);
        const [result_delete_readers] = await pool.query('DELETE FROM readers WHERE id = ?', [id_reader])
        const [result_delete_book] = await pool.query('DELETE FROM books WHERE id = ?', [id]);
        if(result_delete_books_readers && result_delete_readers && result_delete_book)
            return Promise.resolve("book deleted");
        return Promise.reject("something went wrong");
    }

    async returnBook(id: string): Promise<void> {
        const result_book = await pool.query('SELECT id FROM books WHERE id = ?', [id]);
        console.log(result_book);
        if(!result_book)
            return Promise.reject("book not found");
        const [status_book]: Array<any> = await pool.query('SELECT status FROM books WHERE id = ?', [id]);
        if(status_book.length === 0) return Promise.reject("something went wrong");
        console.log(status_book[0].status);
        if(status_book[0].status === "on stock") return Promise.reject("book on stock");
        const update_status = await pool.query('UPDATE books SET status = ? WHERE id = ?',
            [BookStatus.ON_STOCK, id]);
        if(!update_status) return Promise.reject("something went wrong");
        const return_date = await pool.query('UPDATE books_readers SET return_date = ? WHERE id_book = ?', [new Date(), id])
        if(!return_date) return Promise.reject("something went wrong");
        return Promise.resolve();
    }

}

export const libServiceSql = new LibServiceImplSQL();