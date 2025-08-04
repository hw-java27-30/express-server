import {UserService} from "../services/UserService.ts";
import {User} from "../model/userTypes.ts";
import {Request, Response} from "express";
import {baseUrl} from "../config/userServerConfig.ts";
import {myLogger} from "../utils/logger.ts";
import {HttpError} from "../errorHandler/HttpError.js";
import {UserDtoSchema} from "../joiSchemas/userShemas.js";

export class UserController {
    constructor(private userService: UserService) {
    }

    async addUser(req: Request, res: Response) {
        const body = req.body;
        const {value, error} = UserDtoSchema.validate(body);
        if (error) {
            myLogger.log('Wrong params!')
            throw new HttpError(400, 'Bad request: wrong params!')
        }
        const user = value as User;
        const isSuccess = this.userService.addUser(user);
        if (isSuccess) {
            res.status(201).send('Created successfully');
            myLogger.log(`User with id ${user.id} was added`);
            myLogger.save(`User with id ${user.id} was added`);

        } else {
            myLogger.log('User already exists')
            throw new HttpError(409, 'User already exists')
        }
    }

    removeUser(req: Request, res: Response) {
        const {id} = req.query


        if (!id || Number.isNaN(+id)) {
            myLogger.log('Wrong params!')
            throw new HttpError(400, 'Bad request: wrong params!')
        }
        const removed = this.userService.removeUser(+id);
        res.status(200).json(removed);
        myLogger.log(`User with id ${id} was removed from DB`);
        myLogger.save(`User with id ${id} was removed from DB`);


    }

    getAllUsers(req: Request, res: Response) {
        const result = this.userService.getAllUsers();
        res.status(200).json(result);
        myLogger.log(`All users responsed`);
    }

    getUserById(req: Request, res: Response) {
        const url = new URL(req.url!, baseUrl);
        const param = url.searchParams.get('id');
        if (!param || Number.isNaN(parseInt(param))) {
            myLogger.log('Wrong params!');
            throw new HttpError(400, 'Bad request: wrong params!')

        }
        const user = this.userService.getUserById(parseInt(param!));
        res.status(200).json(user);
        myLogger.log(`User responsed`);
    }

    async updateUser(req: Request, res: Response) {
        const body = req.body
        const {value, error} = UserDtoSchema.validate(body);
        if (error) {
            throw new HttpError(400, 'Bad request: wrong params!')
        }
        this.userService.updateUser(value as User);
        res.status(200).send('User was successfully updated');
        myLogger.log(`User with id ${body.id} was updated`);
    }
}