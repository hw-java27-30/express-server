import {AccountService} from "../services/accountService.js";
import {NextFunction, Response} from "express";
import bcrypt from "bcryptjs";
import {AuthRequest, Roles} from "../utils/libTypes.js";
import {checkReaderId} from "../utils/tools.js";
import dotenv from "dotenv";

async function getBasicAuth(authHeader: string, service: AccountService, req: AuthRequest, res: Response) {
    const BASIC = "Basic ";
    const auth = Buffer.from(authHeader.substring(BASIC.length), "base64").toString("ascii");
    console.log(auth);

    const [id, password] = auth.split(":");
    const _id = checkReaderId(id);
    dotenv.config()
    console.log(process.env.OWNER!, process.env.OWNER_PASS)
    if (_id == (+process.env.OWNER!) && password == process.env.OWNER_PASS) {
        console.log('get admin')
        req.userId = _id;
        req.roles = [Roles.ADMIN];
    } else {
        try {
            const account = await service.getAccountById(_id);
            if (bcrypt.compareSync(password, account.passHash)) {
                req.userId = account._id;
                req.userName = account.userName;
                req.roles = [Roles.USER];
                console.log("AUTHENTICATED")
            } else {
                console.log("NOT AUTHENTICATED")
            }
        } catch (e) {
            console.log(e);
        }
    }

}


export const authenticate = (service: AccountService) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        const authHeader = req.header('Authorization');
        console.log(authHeader);
        if (authHeader) {
            await getBasicAuth(authHeader, service, req, res)
            next();
        } else {
            req.roles = [Roles.GUEST];
            next()
        }
    }
}

// export const skipRoutes = (skipRoutes: string[]) =>
//     (req: AuthRequest, res: Response, next: NextFunction)=> {
//         const route = req.method + req.path //   POST/accounts
//         if(!skipRoutes.includes(route) && !req.userId)
//             throw new HttpError(401, "")
//         next();
//     }