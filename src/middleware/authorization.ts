/*
PATCH/accounts/password => Roles.USER,
GET/accounts/reader_id => ROLES.USER, ROLES.ADMIN
 */

import {AuthRequest, Roles} from "../utils/libTypes.js";
import {NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";

export const authorize = (arr: Record<string, Roles[]>) =>
    (req: AuthRequest, res: Response, next: NextFunction) => {
        const route = req.method + req.path
        const roles = req.roles;
        console.log(route, roles)
        if (roles?.some(r => arr[route].includes(r)))
            next();
        else return next(new HttpError(403, ""))
    }

export const PATH_ROLES: Record<string, Roles[]> = {
    'PATCH/accounts/updating/password': [Roles.USER],
    'PATCH/accounts/updating/info': [Roles.USER],
    "GET/accounts/reader_id/": [Roles.USER, Roles.ADMIN],
    "DELETE/accounts/": [Roles.USER, Roles.ADMIN],
    "POST/accounts/": [Roles.GUEST],

}