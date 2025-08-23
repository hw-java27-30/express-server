import {Reader} from "../model/Reader.js";

export interface AccountService {
    addAccount: (reader: Reader) => Promise<void>;
    getAccountById: (id:number) => Promise<Reader>;
    removeAccount: (id:number) => Promise<Reader>;
    changePassword: (id: number, newPassword: string, oldPassword:string) => Promise<void>;
    updateInfo: (id: number, newUserName: string, newEmail: string, newBirthDate: string) => Promise<void>;
}