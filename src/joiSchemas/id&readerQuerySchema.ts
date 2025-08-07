import joi from "joi";


export const idReaderQuerySchema = joi.object({
    id: joi.string().required(),
    reader: joi.string().required(),

})