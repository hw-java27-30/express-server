import {BookDto, BookGenres, BookStatus, PickRecord} from "../model/Book.ts";
import { v4 as uuidv4 } from 'uuid';
import {HttpError} from "../errorHandler/HttpError.js";
import {Reader, ReaderDto} from "../model/Reader.js";
import bcrypt from "bcryptjs";

export function getGenre(genre: string) {
    const bookGenre = Object.values(BookGenres).find(v => v === genre);
    if(!bookGenre) throw  new HttpError(400, "Wrong genre")
    else return bookGenre;
}

export function getStatus (status: string) {
    const bookStatus = Object.values(BookStatus).find(v => v === status);
    if(!bookStatus) throw  new HttpError(400, "Wrong status")
    else return bookStatus;
}

export const convertBookDtoToBook = (dto:BookDto) => {
    return {
        id: uuidv4(),
        title:dto.title,
        author:dto.author,
        genre: getGenre(dto.genre),
        status: BookStatus.ON_STOCK,
        pickList: []
    }
}

export const convertReaderDtoToReader = (dto: ReaderDto) : Reader => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(dto.password, salt);

    return {
        _id: dto.id,
        userName: dto.userName,
        email: dto.email,
        birthdate: dto.birthdate,
        passHash: hash,
    }
}