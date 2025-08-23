import express, {NextFunction, Response} from 'express';
import * as controller from '../controllers/accountController.js'
import {bodyValidation, ReaderDtoSchema} from "../../validation/bodyValidation.js";
import {ChangePassDtoSchema} from "../../validation/joiSchemas.js";
import {accountChecking} from "../middleware/accountChecking.js";
import {updateInfoRouter} from "./updateInfoRouter.js";


export const accountRouter: express.Router = express.Router();

accountRouter.post('/',bodyValidation(ReaderDtoSchema),controller.addAccount);

accountRouter.get('/reader_id', controller.getAccountById);

// accountRouter.patch('/password', bodyValidation(ChangePassDtoSchema), accountChecking(), controller.changePassword);
accountRouter.use('/updating', accountChecking(), updateInfoRouter)
accountRouter.delete('/', accountChecking(), controller.removeAccount)