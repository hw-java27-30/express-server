import {Response, Request} from "express";
import {libServiceEmbedded} from "../services/libServiceImplEmbedded.js";
import {Book, BookDto} from "../model/Book.js";
import {convertBookDtoToBook, getGenre} from "../utils/tools.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {LibServiceMongo} from "../services/libServiceMongoImplEmbedded.js";

export const getBooksByGenre = async (req:Request, res:Response) => {
    const {genre} = req.query;
    const genre_upd = getGenre(genre as string);
    // const result = libServiceEmbedded.getBooksByGenre(genre_upd);
    const result = await LibServiceMongo.getBooksByGenre(genre_upd);
    res.json(result);
}


export const returnBook = async (req:Request, res:Response) => {
    const {id} = req.query;
    // libServiceEmbedded.returnBook(id as string);
    await LibServiceMongo.returnBook(id as string)
    res.send("Book returned")
}


export const pickUpBook = async (req:Request, res:Response) => {
    const {id, reader} = req.query;
    // libServiceEmbedded.pickUpBook(id as string, reader as string);
    await LibServiceMongo.pickUpBook(id as string, reader as string);
    res.send(`Book picked by ${reader}`)
}


export const addBook = async (req:Request, res:Response) => {
    const dto = req.body as BookDto;
    const book:Book = convertBookDtoToBook(dto);
    // const result = libServiceEmbedded.addBook(book);
    const result = await LibServiceMongo.addBook(book);
    if(result)
        res.status(201).json(book)
    else throw new HttpError(409, 'Book not added. Id conflict')
}

export const getAllBooks = async (req:Request, res:Response) =>{
    // const result = libServiceEmbedded.getAllBooks();
    const result = await LibServiceMongo.getAllBooks()
    res.json(result);
}

export const removeBook = async (req:Request, res:Response) =>{
    const {id} = req.query;
    // const result = libServiceEmbedded.removeBook(id as string);
    const result = await LibServiceMongo.removeBook(id as string);
    res.json(result);
}