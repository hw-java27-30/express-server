import express from "express";
import * as controller from '../controllers/accountController.js'
import {bodyValidation} from "../../validation/bodyValidation.js";
import {ChangePassDtoSchema, ChangeInfoDtoSchema} from "../../validation/joiSchemas.js";

export const updateInfoRouter = express.Router()

updateInfoRouter.patch('/password', bodyValidation(ChangePassDtoSchema), controller.changePassword)
updateInfoRouter.patch('/info', bodyValidation(ChangeInfoDtoSchema), controller.updateInfo)