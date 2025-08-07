import joi from "joi"
import {BookGenres} from "../model/Book.js";

const genreValues = Object.values(BookGenres)

export const genreSchema = joi.object({
    genre: joi.string().valid(...genreValues),
})