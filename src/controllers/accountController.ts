import {Request, Response} from 'express';
import {Reader, ReaderDto} from "../model/Reader.js";
import {convertReaderDtoToReader} from "../utils/tools.js";
import {accountServiceMongo} from '../services/AccountServiceImplMongo.js'
import {HttpError} from "../errorHandler/HttpError.js";
import bcrypt from "bcryptjs";

export const removeAccount = async (req: Request, res: Response) => {
    const {id} = req.query;
    if (!id) throw new HttpError(409, `Wrong query params`)
    const deletedReader: Reader = await accountServiceMongo.removeAccount(parseInt(id as string))
    if (!deletedReader) throw new HttpError(500, "something went wrong")
    res.status(200).send(deletedReader)

};

export const changePassword = async (req: Request, res: Response) => {
    const {id, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await accountServiceMongo.changePassword(id, hashedPassword);
    res.status(200).send('password changed successfully')

};

export const addAccount = async (req: Request, res: Response) => {
    const body = req.body;
    const reader: Reader = convertReaderDtoToReader(body as ReaderDto);
    await accountServiceMongo.addAccount(reader)
    res.status(201).send();
}

export const getAccount = async (req: Request, res: Response) => {
    const {id} = req.query;
    if (!id) throw new HttpError(409, `Wrong query params`)
    const showReader: Reader = await accountServiceMongo.getAccount(parseInt(id as string))
    if (!showReader) throw new HttpError(500, "something went wrong")
    res.status(200).send(showReader)
}