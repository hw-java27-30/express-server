import joi from 'joi'
import {Post} from "../model/postTypes.js";


export const PostDtoSchema = joi.object({
    id: joi.number().min(1).max(1000).required(),
    userId: joi.number().min(1).max(200).required(),
    title: joi.string().default("No title"),
    text: joi.string().default("Some text")
})
