import {LibServiceImplEmbedded} from "../services/libServiceImplEmbedded.js";
import {libService} from "../services/libService.js";
import {Request, Response} from "express";
import {Book, BookDto, BookGenres} from "../model/Book.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {convertBookDtoToBook} from "../utils/tools.js";


export class BookController {
    private libService: libService = new LibServiceImplEmbedded()

    getAllBooks(req: Request, res: Response) {
        const result = this.libService.getAllBooks()
        console.log(result)
        res.json(result)
    }

    addBook(req: Request, res: Response) {
        const dto = req.body as BookDto
        const book: Book = convertBookDtoToBook(dto)
        const result = this.libService.addBook(book)
        if (result) {
            res.status(201).json(book)
        }
        else {
            throw new HttpError(409, 'Book not added. Id conflict')
        }
    }

    removeBook(req: Request, res: Response) {
        console.log(req.params)
        const removedBook = this.libService.removeBook(req.params.id)
        res.json(removedBook)
    }

    async getBooksByGenre(req: Request, res: Response) {
        const genre: BookGenres = req.query.genre as BookGenres
        const booksByGenre: Book[] = await this.libService.getBooksByGenre(genre)
        res.json(booksByGenre)

    }

    pickUpBook(req: Request, res: Response) {
        const {id, reader} = req.query
        console.log(req.query)
        this.libService.pickUpBook(id as string, reader as string)
        res.status(200).send(`book ${id} was picked up by ${reader}`)
    }

    returnBook(req: Request, res: Response) {
        const {id} = req.query
        this.libService.returnBook(id as string)
        res.status(200).send(`book ${id} was returned`)

    }
}
