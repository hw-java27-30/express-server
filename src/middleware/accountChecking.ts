import {NextFunction, Response} from "express";
import {AuthRequest, Roles} from "../utils/libTypes.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";
import {Reader} from "../model/Reader.js";

export const accountChecking = () => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        const account = await ReaderModel.findById(req.userId) as Reader;
        if (account.roles.includes(Roles.ADMIN)) {
            console.log(account.roles);
            next()
        }
        const body = req.body?.id;
        const query = req.query?.id;
        const id = body ?? query
        if (id == null || id == '') throw new HttpError(400, '');
        if (id == req.userId) {
            next()
        } else throw new HttpError(400, '')
    }
}