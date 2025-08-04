import joi from "joi";

export const UserDtoSchema = joi.object({
    id: joi.number().min(1).max(1000).required(),
    userName: joi.string().required(),
})

export const UserQuerySchemaId = joi.object({
    id: joi.number().min(1).max(1000).required(),
})

export const UserQuerySchemaUserName = joi.object({
    userName: joi.string().required()
})