import express from 'express';
import {movieRouter} from "./movieRouter.js";

export const mflixRouter = express.Router();

mflixRouter.use('/movies', movieRouter)