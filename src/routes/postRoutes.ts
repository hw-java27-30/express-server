import express, {Request, Response, NextFunction} from "express";
import * as controller from '../controllers/postController.js'
import {Post} from "../model/postTypes.js";
import {myLogger} from "../utils/logger.ts";
import asyncHandler from "express-async-handler";
import {PostDtoSchema} from "../joiSchemas/postShemas.js";
import {HttpError} from "../errorHandler/HttpError.js";

export const postRouter = express.Router();

postRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.log(`Request "api/posts${req.url}" was recieved`)
    next();
})
postRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.save(`Request "api/posts${req.url}" was recieved`)
    next();
})

postRouter.get('/user/:userId', asyncHandler((req: Request, res: Response) => {
    controller.getUserPost(req, res);
}))

postRouter.delete('/post/:id', asyncHandler((req: Request, res: Response) => {
        const id = req.params.id;
        if (!id)
            throw new HttpError(400, "Bad request");
        controller.removePost(req, res);
    }
))
postRouter.put('/', asyncHandler(async (req: Request, res: Response) => {
    const postDto = req.body;
    const {value, error} = PostDtoSchema.validate(postDto);
    if (error)
        throw new HttpError(400, error.message);
    req.body = value as Post;
    controller.updatePost(req, res);
}))

postRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
    //const postDto = await parseBody(req);
    const postDto = req.body;
    const {value, error} = PostDtoSchema.validate(postDto);
    if (error) throw new HttpError(400, error.message);
    req.body = value as Post;
    controller.addPost(req, res);
}))

postRouter.get('/', asyncHandler((req: Request, res: Response) => {
    const result: Post[] = controller.getAllPosts();
    res.type("application/json").send(JSON.stringify(result))
}))
//http://localhost:3005/api/posts/post/2/user/5
postRouter.get('/post/:id', asyncHandler((req: Request, res: Response) => {
    const {id} = req.params;
    if (!id)
        throw new HttpError(404, 'Post not found')
    controller.getPostById(req, res);
}))

postRouter.get('/user', asyncHandler((req: Request, res: Response) => {
    const {userName} = req.query
    if (!userName || typeof userName !== "string")
        throw new HttpError(400, "Bad request: userName required");
    controller.getUserPostsByName(req, res);
}))
