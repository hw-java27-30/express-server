import joi from "joi";

export const BookDtoSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    genre: joi.string().required(),
    quantity: joi.number(),
})
