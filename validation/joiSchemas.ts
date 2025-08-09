import joi from "joi";

export const BookDtoSchema = joi.object({
    title: joi.string().min(2).required(),
    author: joi.string().min(1).required(),
    genre: joi.string().required(),
    quantity: joi.number().min(1).max(10),
})