import {libServiceMongo} from "./libServiceMongo.js";
import {Book, bookDbModel, BookGenres, BookStatus} from "../model/Book.js";
import {HttpError} from "../errorHandler/HttpError.js";


export class LibServiceMongoImplEmbedded implements libServiceMongo {
    async addBook(book: Book): Promise<boolean> {
        const exist = await bookDbModel.findOne({id: book.id})
        if(!exist) {
            const userToAdd = new bookDbModel(book)
            await userToAdd.save()
            return true;
        }
        return false;

    }

    async getAllBooks(): Promise<Book[]> {
        return await bookDbModel.find();
    }

    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        return await bookDbModel.find({genre: genre});
    }

    async pickUpBook(id: string, reader: string): Promise<void> {
        const book = await this.getBookById(id);
        if(book.status !== BookStatus.ON_STOCK) throw new HttpError(409, "No this book on stock")
        book.status = BookStatus.ON_HAND
        book.pickList.push({pick_date: new Date().toDateString(), reader: reader, return_date: null});
        book.save()
        return;
    }

    async removeBook(id: string): Promise<Book> {
        const book = await this.getBookById(id);
        await bookDbModel.deleteOne({id: id})
        return book.toObject() as Book;

    }


    async returnBook(id: string): Promise<void> {
        const book = await this.getBookById(id);
        if(book.status !== BookStatus.ON_HAND) throw new HttpError(409, "This book is on stock")
        book.status=BookStatus.ON_STOCK;
        book.pickList[book.pickList.length - 1].return_date = new Date().toDateString();
        book.save()
        return
    }

    async getBookById(id: string) {
        const res = await bookDbModel.findOne({id: id})
        if(!res) throw new HttpError(404, `Book with id ${id} not found`);
        return res;
    }

}

export const LibServiceMongo = new LibServiceMongoImplEmbedded();