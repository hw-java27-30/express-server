import {NextFunction, Request, Response} from "express";
import {HttpError} from "./HttpError.js";

export const errorHandler =
    (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    if (err instanceof HttpError) res.status(err.status).send(err.message);
    else {
        console.log(err.stack);
        res.status(500).send('Unknown error server');
    }
    };