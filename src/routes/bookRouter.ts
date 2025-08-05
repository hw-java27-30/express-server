import express from 'express';

export const bookRouter = express.Router();

bookRouter.use('/books', bookRouter)