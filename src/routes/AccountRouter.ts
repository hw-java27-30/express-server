import express from 'express';
import * as controller from '../controllers/accountController.js'
import {bodyValidation, ChangePassDtoSchema, ReaderDtoSchema} from "../../validation/bodyValidation.js";

export const accountRouter: express.Router = express.Router();

accountRouter.post('/', bodyValidation(ReaderDtoSchema) ,controller.addAccount);
accountRouter.get('/reader', controller.getAccount);
accountRouter.patch('/password', bodyValidation(ChangePassDtoSchema) ,controller.changePassword);
accountRouter.delete('/', controller.removeAccount)
