import { PostsService } from "./posts.service";
import { Request, Response } from "express";

export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    async create(req: Request, res: Response) {

    }

    async update(req: Request, res: Response) {}
    
    async findAll(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }

    async findOne(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }

    async delete(req: Request, res: Response) {}
}
