import {libService} from "./libService.js";
import {Book, BookGenres, PickRecord} from "../model/Book.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class LibServiceImplEmbedded implements libService {
    private books: Book[] = [];

    addBook(book: Book): boolean {
        const index = this.books.findIndex(item => item.id === book.id);
        if (index === -1) {
            this.books.push(book)
            return true
        }
        return false;
    }

    getAllBooks(): Book[] {
        return [...this.books];
    }

    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        return this.books.filter(item => item.genre == genre);
    }

    pickUpBook(id: string, reader: string): void {
        const index = this.books.findIndex(item => item.id === id);
        if (index !== -1) {
            if ((!this.books[index].pickList[this.books[index].pickList.length - 1]) ||
                this.books[index].pickList[this.books[index].pickList.length - 1].return_date
            ) {
                const newPickList: PickRecord = {
                    reader,
                    pik_date: new Date().toISOString(),
                    return_date: null,
                }
                this.books[index].pickList.push(newPickList)
            }
        }
        else {
            throw new HttpError(404, `Book with id ${id} not found`);
        }
    }

    removeBook(id: string): Book {
        const index = this.books.findIndex(item => item.id === id);
        if (index === -1) throw new HttpError(404, `Book with id ${id} not found`);
        const [removedBook] = this.books.splice(index, 1);
        return removedBook;
    }

    returnBook(id: string): void {
        const index = this.books.findIndex(item => item.id === id);
        if (index !== -1) {
            if (!this.books[index].pickList[this.books[index].pickList.length - 1].return_date) {
                this.books[index].pickList[this.books[index].pickList.length - 1].return_date = new Date().toISOString()
            }
        } else {
            throw new HttpError(404, `Book with id ${id} not found`);
        }
    }

}