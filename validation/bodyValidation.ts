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

    export const ReaderDtoSchema = joi.object({
        id: joi.number().positive().max(999999999).min(100000000).required(),
        userName: joi.string().min(1).required(),
        email: joi.string().email().required(),
        password: joi.string().alphanum().min(8).required(),
        birthdate: joi.string().isoDate().required(),
    })

    // export const ChangePassDtoSchema = joi.object({
    //     id: joi.number().positive().max(999999999).min(100000000).required(),
    //     password: joi.string().alphanum().min(8).required(),
    // })