import Joi from "joi";
import joi from "joi";

export const BookDtoSchema = Joi.object({
    title:Joi.string().min(2).required(),
    author:Joi.string().min(1).required(),
    genre:Joi.string().required(),
    quantity:Joi.number().min(1).max(10)
});

export const ChangePassDtoSchema = Joi.object({
    id:Joi.number().positive().max(999999999).min(100000000).required(),
    oldPassword: Joi.string().alphanum().min(8).required(),
    newPassword: Joi.string().alphanum().min(8).required(),
})

export const ChangeInfoDtoSchema = Joi.object({
    id:Joi.number().positive().max(999999999).min(100000000).required(),
    userName: joi.string().min(1).required(),
    email: joi.string().email().required(),
    birthdate: joi.string().isoDate().required(),
})

export const ReaderDtoSchema = joi.object({
    id: joi.number().positive().max(999999999).min(100000000).required(),
    userName: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(8).required(),
    birthdate: joi.string().isoDate().required(),
})