import * as mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';
import {string} from "joi";
import {BookGenres, BookStatus} from "./Book.js";

const PickListSchema = new mongoose.Schema({
    reader: {type: String, required: true},
    pick_date: {type: String, required: true},
    return_date: {type: String, default: null},
})

export const bookMongooseSchema= new mongoose.Schema({
    // _id: {type: String, length: 36, required:true},
    // _id: {type: 'UUID', default: () => uuidv4()},
    _id: {type: String, default: () => uuidv4()},
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, enum: Object.values(BookGenres), required: true},
    status: {type: String, enum: Object.values(BookStatus), required: true},
    pickList: {type: [PickListSchema], default: []},
})

export const BookMongooseModel = mongoose.model('Book', bookMongooseSchema, 'book_collection');