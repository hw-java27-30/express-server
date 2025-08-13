import express from 'express';
import * as controller from '../controllers/BookControllerFunc.ts'
import {bodyValidation} from "../../validation/bodyValidation.js";
import {BookDtoSchema} from "../../validation/joiSchemas.js";
export const movieRouter = express.Router();

movieRouter.get('/', controller.getAllBooks);
movieRouter.post('/', bodyValidation(BookDtoSchema), controller.addBook);
movieRouter.delete('/',controller.removeBook);
movieRouter.patch('/pickup',controller.pickUpBook);
movieRouter.patch('/return',controller.returnBook);
movieRouter.get('/genre', controller.getBooksByGenre);
movieRouter.get('/genre_status', controller.getBooksByGenreAndStatus);

