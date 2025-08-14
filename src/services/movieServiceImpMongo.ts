import {movieService} from "./movieService.js";
import {Movie} from "../model/Movie.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {MovieMongooseModel} from "../model/MovieMongooseModel.js";


export class movieServiceImpMongo implements movieService{
    async getMoviesRates(): Promise<Movie[]> {
        const result = await MovieMongooseModel.aggregate([
            {
                $match: {
                    $expr: {$gt:["$tomatoes.viewer.rating", "$imdb.rating"]},
                }
            }
        ])
        if (!result) {
            throw new HttpError(404, "No movies found.");
        }
        return Promise.resolve(result);
    }

    async getMoviesRus(): Promise<Movie[]> {
        const result = await MovieMongooseModel.find({languages: ["Russian"]}) as Movie[];
        return Promise.resolve(result);
    }

    async getMoviesGenres(): Promise<Movie[]> {
        const result = await MovieMongooseModel.find({genres: {$all: ["Action", "Comedy"], $size: 2}}) as Movie[];
        return Promise.resolve(result);
    }

    async getTwoMoviesMax(): Promise<Movie[]> {
        const result = await MovieMongooseModel.find
        return Promise.resolve([]);
    }
    // async addBook(book: Book): Promise<boolean> {
    //     const isExist = await BookMongooseModel.findById(book.id).exec();
    //     if (isExist) {
    //         return false;
    //     }
    //     // const newBook = new BookMongooseModel(book);
    //     // await newBook.save();
    //     const temp = await BookMongooseModel.create({
    //         _id: book.id,
    //         title: book.title,
    //         author: book.author,
    //         genre: book.genre,
    //         status: book.status,
    //         pickList: book.pickList,
    //     })
    //     if (!temp) return Promise.resolve(false)
    //     return Promise.resolve(true);
    // }
    //
    // async getAllBooks(): Promise<Book[]> {
    //     const result = await BookMongooseModel.find().exec();
    //     return result as Book[];
    // }
    //
    // async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
    //     const result = await BookMongooseModel.find({genre}).exec();
    //     return Promise.resolve(result as Book[]);
    // }
    //
    // async pickUpBook(id: string, reader: string): Promise<void> {
    //     const book = await BookMongooseModel.findById(id).exec();
    //     if (!book) throw new HttpError(404, `Book with id ${id} not found`);
    //     if (book.status !== BookStatus.ON_STOCK) throw new HttpError(409, `Book with id ${id} just on hand`);
    //     book.status = BookStatus.ON_HAND
    //     book.pickList.push({
    //         reader,
    //         pick_date: new Date().toDateString(),
    //         return_date: null
    //     })
    //     book.save()
    // }
    //
    // async removeBook(id: string): Promise<Book> {
    //     // const book = await BookMongooseModel.findById(id).exec();
    //     // if (!book) throw new HttpError(404, `Book with id ${id} not found`);
    //     // if (book.status !== BookStatus.ON_HAND) throw new HttpError(409, `Book with id ${id} just on stock`);
    //     // book.status = BookStatus.ON_STOCK
    //     // const temp = book.pickList[book.pickList.length - 1];
    //     // temp.return_date = new Date().toDateString();
    //     // book.save()
    //     // return book as Book;
    //     return undefined as Book;
    // }
    //
    // async returnBook(id: string): Promise<void> {
    //     const book = await BookMongooseModel.findById(id).exec();
    //     if (!book) throw new HttpError(404, `Book with id ${id} not found`);
    //     if (book.status !== BookStatus.ON_HAND) throw new HttpError(409, `Book with id ${id} just on stock`);
    //     book.status = BookStatus.ON_STOCK
    //     const temp = book.pickList.slice(-1)[0];
    //     temp.return_date = new Date().toDateString();
    //     book.save()
    // }
    //
    // async getBooksByGenreAndStatus(genre: BookGenres, status: BookStatus): Promise<Book[]> {
    //     const result = await BookMongooseModel.find({genre, status}).exec() as Book[];
    //     return Promise.resolve(result);
    // }
}

export const MovieServiceMongo = new movieServiceImpMongo();