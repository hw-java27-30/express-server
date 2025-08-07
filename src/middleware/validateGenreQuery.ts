import {NextFunction, Request, Response} from "express";
import {genreSchema} from "../joiSchemas/genreSchema.js";
import {HttpError} from "../errorHandler/HttpError.js";

export const validateGenreQuery = (req: Request, res: Response, next: NextFunction) => {
    const {value, error} = genreSchema.validate(req.query);
    if (error) {
        return next(new HttpError(400, 'Bad request: wrong params!'))
    }
    next();
}