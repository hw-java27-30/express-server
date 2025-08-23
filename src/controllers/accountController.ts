import {Request, Response} from 'express';
import {Reader, ReaderDto} from "../model/Reader.js";
import {checkReaderId, convertReaderDtoToReader} from "../utils/tools.js";
import {accountServiceMongo} from '../services/AccountServiceImplMongo.js'
import Joi from "joi";
import joi from "joi";


export const removeAccount = async (req: Request, res: Response) => {
    const {id} = req.query;
    const _id = checkReaderId(id as string);
    const account = await accountServiceMongo.removeAccount(_id);
    res.json(account)
}

export const changePassword = async (req: Request, res: Response) => {
    const {id, oldPassword, newPassword} = req.body;

    const _id = checkReaderId(id);
    await accountServiceMongo.changePassword(_id, oldPassword, newPassword);
    res.send("Password changed")
}
export const updateInfo = async (req: Request, res: Response) => {
    const {id, userName, email, birthdate} = req.body;
    const _id = checkReaderId(id);
    await accountServiceMongo.updateInfo(_id, userName, email, birthdate);
    res.send("Info changed")
}

export const getAccountById = async (req: Request, res: Response) => {
    const {id} = req.query;
    try {
        const _id = checkReaderId(id as string);
        const account = await accountServiceMongo.getAccountById(_id);
        res.json(account);
    } catch (e) {
        console.error(e);
    }

}
export const addAccount = async (req: Request, res: Response) => {
    const body = req.body;
    const reader: Reader = convertReaderDtoToReader(body as ReaderDto);
    await accountServiceMongo.addAccount(reader);
    res.status(201).send();
}