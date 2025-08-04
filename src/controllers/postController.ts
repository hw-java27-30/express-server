import {Post} from "../model/postTypes.js";
import {postService, service} from "../server.ts";
import {Request, Response} from "express";
import {HttpError} from "../errorHandler/HttpError.js";


export function getUserPostsByName(req: Request, res: Response) {
    const users = service.getAllUsers();
    const user = users.find(item => item.userName === req.query.userName);
    if (!user) throw new HttpError(404, "User not found");

    const result = postService.getAllUserPosts(user!.id)
    res.json(result)
}

export function getUserPost(req: Request, res: Response) {
    const uId = parseInt(req.params.userId);
    if (!uId) throw new HttpError(400, "Bad user Id in request")
    res.json(postService.getAllUserPosts(uId));
}

export function updatePost(req: Request, res: Response) {
    const post = req.body;
    if (!service.getUserById(post.userId))
        throw new HttpError(404, "User not found")
    const result = postService.updatePost(post);
    if (result)
        res.send("Post successfully updated")
    else throw new HttpError(404, "Post not found")
}

export function removePost(req: Request, res: Response) {
    const postId = parseInt(req.params.id);
    const result = postService.removePost(postId);
    res.json(result)
}

export function getPostById(req: Request, res: Response) {
    const postId = parseInt(req.params.id);
    if (!postId) throw new HttpError(400, "Bad ID in request")
    //   try{
    res.json(postService.getPost(postId));
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

