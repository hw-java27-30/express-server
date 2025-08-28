import joi, {ObjectSchema} from 'joi'
import {NextFunction, Response, Request} from "express";
import {HttpError} from "../src/errorHandler/HttpError.js";


export const bodyValidation = (schema: ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.body) throw new HttpError(400, 'Body required');
        const {error} = schema.validate(req.body);
        if (error) throw new HttpError(400, error.message)
        next()
    }



    // export const ChangePassDtoSchema = joi.object({
    //     id: joi.number().positive().max(999999999).min(100000000).required(),
    //     password: joi.string().alphanum().min(8).required(),
    // })