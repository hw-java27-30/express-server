import express from 'express';
import * as controller from '../controllers/accountController.js'
import {bodyValidation} from "../../validation/bodyValidation.js";
import {accountChecking} from "../middleware/accountChecking.js";
import {updateInfoRouter} from "./updateInfoRouter.js";
import {ReaderDtoSchema} from "../../validation/joiSchemas.js";


export const accountRouter: express.Router = express.Router();

accountRouter.post('/',bodyValidation(ReaderDtoSchema),controller.addAccount);

accountRouter.get('/reader_id', controller.getAccountById);

accountRouter.use('/updating', accountChecking(), updateInfoRouter)
accountRouter.delete('/', accountChecking(), controller.removeAccount)