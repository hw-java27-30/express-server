import {NextFunction, Response, Request} from "express";
import {AuthRequest} from "../utils/libTypes.js";
import {HttpError} from "../errorHandler/HttpError.js";

export const accountChecking = () => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const body = req.body?.id;
        const query = req.query?.id;
        const id = body ?? query
        if (id == null || id == '') throw new HttpError(400, '');
        if (id == req.userId) {
            next()
        }
        else throw new HttpError(400, '')
    }
}