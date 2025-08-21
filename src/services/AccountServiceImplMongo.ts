import {AccountService} from "./accountService.js";
import {Reader} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class AccountServiceImplMongo implements AccountService {
    async addAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findById(reader._id)
        if (temp) throw new HttpError(409, `Reader already exists`)
        const readerDoc = new ReaderModel(reader)
        await readerDoc.save()
    }

    async changePassword(id: number, newPassword: string): Promise<void> {
        const temp = await ReaderModel.findById(id);
        if (!temp) throw new HttpError(409, `Reader does not exist`)
        temp.passHash = newPassword
        await temp.save()
    }

    async getAccount(id: number): Promise<Reader> {
        const temp = await ReaderModel.findById(id) as Reader;
        if (!temp) throw new HttpError(409, `Reader does not exist`)
        return temp
    }

    async removeAccount(id: number): Promise<Reader> {
        const temp = await ReaderModel.findById(id) as Reader;
        if (!temp) throw new HttpError(409, `Reader does not exist`)
        await ReaderModel.deleteOne({_id: id})
        return temp;

    }

}

export const accountServiceMongo = new AccountServiceImplMongo();