import {Roles} from "../utils/libTypes.js";
import {Book, BookForReader} from "./Book.js";

export type ReaderDto = {
    id: number;
    userName: string;
    email: string;
    password: string;
    birthdate: string;
}

export type Reader = {
    _id: number;
    userName: string;
    email: string;
    birthdate: string;
    passHash: string;
    roles: Roles[],
    bookList: BookForReader[];
}