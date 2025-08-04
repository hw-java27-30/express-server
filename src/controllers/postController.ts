import {Post} from "../model/postTypes.js";
import {postService, service} from "../server.ts";
import {Request, Response} from "express";
import {HttpError} from "../errorHandler/HttpError.js";
import {PostDtoSchema, PostQuerySchemaId, PostQuerySchemaUserId} from "../joiSchemas/postShemas.js";
import {myLogger} from "../utils/logger.js";


export function getUserPostsByName(req: Request, res: Response) {
    const users = service.getAllUsers();
    const user = users.find(item => item.userName === req.query.userName);
    if (!user) throw new HttpError(404, "User not found");

    const result = postService.getAllUserPosts(user!.id)
    res.json(result)
}

export function getUserPost(req: Request, res: Response) {
    const {value, error} = PostQuerySchemaUserId.validate(req.params)
    if (error) {
        myLogger.log('Wrong params!');
        throw new HttpError(400, "Bad user Id in request")
    }
    console.log(value)
    const {userId} = value
    res.json(postService.getAllUserPosts(+userId));
}

export function updatePost(req: Request, res: Response) {
    const {value, error} = PostDtoSchema.validate(req.body)
    console.log(value)
    if (error) {
        throw new HttpError(400, 'Bad request: wrong params!')
    }
    if (!service.getUserById(+value.userId))
        throw new HttpError(404, "User not found")
    const result = postService.updatePost(value);
    if (result)
        res.send("Post successfully updated")
    else throw new HttpError(404, "Post not found")
}

export function removePost(req: Request, res: Response) {
    const {value} = PostQuerySchemaId.validate(req.params);
    const {id} = value
    const result = postService.removePost(+id);
    res.json(result)
}

export function getPostById(req: Request, res: Response) {
    const {value} = PostQuerySchemaId.validate(req.params);
    const {id} = value
    //   try{
    res.json(postService.getPost(+id));
    // } catch (e) {
    //     res.status(404).send("Post not found")
    // }
}

export function getAllPosts() {
    return postService.getAllPosts();
}

export function addPost(req: Request, res: Response) {
    console.log(req.body)
    const post = req.body as Post;
    const result = service.getUserById(post.userId)
    const addPostResult = postService.addPost(post)
    if (!addPostResult) throw new HttpError(400, "Bad post id in request")
    res.status(201).send("Post was successfully added")
}

