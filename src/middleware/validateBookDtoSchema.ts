import {NextFunction, Request, Response} from "express";
import {BookDtoSchema} from "../joiSchemas/BookDtoSchema.js";
import {HttpError} from "../errorHandler/HttpError.js";


export const validateBookDtoSchema = (req: Request, res: Response, next: NextFunction) => {
    const {error} = BookDtoSchema.validate(req.body);
    if (error) {
        return next(new HttpError(400, 'Bad request: wrong info!'))
    }
    next()
}