import {NextFunction, Request, Response} from "express";
import {idReaderQuerySchema} from "../joiSchemas/id&readerQuerySchema.js";
import {HttpError} from "../errorHandler/HttpError.js";

export const validateIdReaderQuery = (req: Request, res: Response, next: NextFunction) => {
    const {error} = idReaderQuerySchema.validate(req.query);
    console.log(req.query)
    if (error) {
        return next(new HttpError(400, 'Bad request: wrong query params!'))
    }
    next()
}