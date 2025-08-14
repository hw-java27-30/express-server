import express from 'express';
import * as controller from '../controllers/mflixControllerFunc.ts'
export const movieRouter = express.Router();

movieRouter.get('/', controller.getMoviesRates);
movieRouter.get('/russian', controller.getMoviesRus);
movieRouter.get('/genre', controller.getMoviesGenres);


