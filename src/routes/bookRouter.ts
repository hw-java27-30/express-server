import express, {Request, Response} from 'express';
import {BookController} from "../controllers/BookController.js";
import asyncHandler from "express-async-handler";
import {validateGenreQuery} from "../middleware/validateGenreQuery.js";
import {validateBookDtoSchema} from "../middleware/validateBookDtoSchema.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {idReaderQuerySchema} from "../joiSchemas/id&readerQuerySchema.js";
import {validateIdReaderQuery} from "../middleware/validateIdReaderQuery.js";

export const bookRouter = express.Router();

const controller = new BookController();

// bookRouter.post('/', bodyValidator(BookDtoJoiSchema), controller.addBook)
bookRouter.get('/', validateGenreQuery, (req: Request, res: Response) => {
    if (req.query.genre) {
        console.log(req.query.genre);
        return controller.getBooksByGenre(req, res)
    }
    return controller.getAllBooks(req, res);
})

bookRouter.post('/', validateBookDtoSchema, (req: Request, res: Response) => {
    console.log(req.body)
    controller.addBook(req, res);
})

bookRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    if (id) {
        return controller.removeBook(req, res);
    }
    throw new HttpError(400, 'Bad request: wrong params')
})

bookRouter.get('/pickup', validateIdReaderQuery, (req: Request, res: Response) => {
    controller.pickUpBook(req, res);
})

bookRouter.get('/return', (req: Request, res: Response) => {
    const {id} = req.query
    if (id) {
        return controller.returnBook(req, res);
    }
    throw new HttpError(400, 'Bad request: wrong params')
})



