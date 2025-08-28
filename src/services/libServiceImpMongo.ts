import {LibService} from "./libService.js";
import {Book, BookForReader, BookGenres, BookStatus} from "../model/Book.js";
import * as mongoose from "mongoose";
import {BookMongooseModel} from "../model/BookMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";


export class LibServiceImplMongo implements LibService{

    async addBook(book: Book): Promise<boolean> {
        const isExists = await BookMongooseModel.findById(book.id).exec();
        if(isExists)
            return Promise.resolve(false);
        const newBook = new BookMongooseModel(book);
        await newBook.save();
        // const temp = await BookMongooseModel.create({
        //     _id: book.id,
        //     title: book.title,
        //     author: book.author,
        //     genre: book.genre,
        //     status: book.status,
        //     pickList: book.pickList
        // })
        //if(!temp) return Promise.resolve(false)
        return Promise.resolve(true);
    }

    async getAllBooks(): Promise<Book[]> {
        const result = await BookMongooseModel.find().exec() as Book[]
        return Promise.resolve(result) ;
    }

    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        const result = await BookMongooseModel.find({genre}).exec() as Book[];
        return Promise.resolve(result);
    }

    async pickUpBook(id: string, userId: number, reader: string): Promise<void> {
        const book = await BookMongooseModel.findOne({_id:id}).exec();
        if(!book)
            throw new HttpError(404, `Book with id: ${id} not found`);
        if(book.status !== BookStatus.ON_STOCK)
            throw new HttpError(409, "Book just on hand");
        book.status = BookStatus.ON_HAND;
        book.pickList.push({reader, pick_date: new Date().toDateString(), return_date: null});
        book.save();
        const pushedBook: BookForReader = {
            author: book.author, genre: book.genre, id: book.id, title: book.title

        }
        const readerBook = await ReaderModel.findOne({_id:userId}).exec();
        if(!readerBook)
            throw new HttpError(404, `Reader with id: ${userId} not found`);
        readerBook.bookList.push(pushedBook)
        readerBook.save()
    }

    async removeBook(id: string): Promise<Book> {
        const book = await BookMongooseModel.findOneAndDelete({_id: id}).exec();
        if (!book)
            throw new HttpError(404, `Book with id: ${id} not found`);
        return book as Book;
    }

    async returnBook(id: string, userId: number): Promise<void> {
        const book = await BookMongooseModel.findById(id).exec();
        if (!book)
            throw new HttpError(404, `Book with id: ${id} not found`);
        if (book.status !== BookStatus.ON_HAND)
            throw new HttpError(409, "Book on stock");
        book.status = BookStatus.ON_STOCK;
        const temp = book.pickList[book.pickList.length-1];
        temp.return_date = new Date().toDateString();
        book.save();
        const readerBook = await ReaderModel.findOne({_id:userId}).exec();
        if(!readerBook)
            throw new HttpError(404, `Reader with id: ${userId} not found`);
        readerBook.bookList = readerBook.bookList.filter(readerBook => readerBook.id !== id);
        readerBook.save()

    }

    async getBooksByGenreAndStatus(genre: BookGenres, status: BookStatus):Promise<Book[]> {
        const result = await BookMongooseModel.find({genre, status}).exec() as Book[]
        return Promise.resolve(result)
    }

    async getBookById(id: string): Promise<Book> {
        const book = await BookMongooseModel.findById(id).exec();
        if (!book)
            throw new HttpError(404, `Book with id: ${id} not found`);
        return book as Book;
    }

    async infoBooksByReader(id: string): Promise<Book[]> {
        const reader = await ReaderModel.findById(id)
        if (!reader)
            throw new HttpError(404, `Reader with id: ${id} not found`);
        const books = await BookMongooseModel.find({"pickList.reader": reader.userName})
        if(!books)
            throw new HttpError(404, `Books with this reader not found`);

        return books as Book[];
    }
}

export const libServiceMongo = new LibServiceImplMongo();