import * as mongoose from "mongoose";
import {string} from "joi";

export type BookDto = {
    title:string,
    author:string,
    genre:string,
    quantity?:number
}
export const PickRecordSchema = new mongoose.Schema({
    reader: { type: String, required: true },
    pick_date: { type: String, required: true },
    return_date: { type: String, required: false }
}, { _id: false });

export const BookDtoMongooseSchema = new mongoose.Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    status: {type: String, required: true},
    pickList: {type: [PickRecordSchema], required: true},
    quantity: {type: Number, required: false},
})

export const bookDbModel = mongoose.model('library', BookDtoMongooseSchema);

export type Book = {
    id: string,
    title:string,
    author:string,
    genre: BookGenres,
    status: BookStatus,
    pickList: PickRecord[]
}

export enum BookGenres {
    "SCI_FI" = 'sci-fi',
    "ADVENTURE" = 'adventure',
    "FANTASY" = 'fantasy',
    "ROMANTIC" = 'romantic',
    "CLASSIC" = 'classic',
    "DYSTOPIA" = 'dystopia',
    "DETECTIVE" = "detective"
}

export enum BookStatus {
    "ON_STOCK" = "on stock",
    "ON_HAND" = "on hand",
    "REMOVED" = "removed"
}

export type PickRecord = {
    reader: string,
    pick_date: string,
    return_date:string | null
}