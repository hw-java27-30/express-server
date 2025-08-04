import joi from "joi";

export const UserDtoSchema = joi.object({
    id: joi.number().min(1).max(1000).required(),
    userName: joi.string().required(),
})