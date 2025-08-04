import express from "express";
import {userController} from "../server.ts";
import asyncHandler from "express-async-handler";

export const userRouter = express.Router()
// api/users?id=122
userRouter.get('/', asyncHandler((req, res) => {
    if(req.query.id) userController.getUserById(req, res)
    else userController.getAllUsers(req, res);
}))

userRouter.post('/',asyncHandler(async (req, res) => {
    await userController.addUser(req, res);
}))
// userRouter.get('/user', (req, res) => {
//     userController.getUserById(req, res);
// })
userRouter.delete('/', asyncHandler((req, res) => {
    userController.removeUser(req, res)
}))
userRouter.put('/', asyncHandler(async (req, res) => {
    await userController.updateUser(req, res)
}))

