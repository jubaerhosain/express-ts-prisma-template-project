import { CustomError } from "../../utils/custom.error";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostQueryDto } from "./dto/post-query.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsService } from "./posts.service";
import { Request, Response } from "express";

export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    async create(req: Request, res: Response) {
        const postDto: CreatePostDto = req.body;
        const post = await this.postsService.create(postDto);
        res.status(201).json(post);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updateDto: UpdatePostDto = req.body;
        const post = await this.postsService.update(+id, updateDto);
        res.status(200).json(post);
    }

    async findAll(req: Request, res: Response) {
        const query: PostQueryDto = req.query;
        const posts = await this.postsService.findAll(query);
        res.status(200).json(posts);
    }

    async findOne(req: Request, res: Response) {
        throw new CustomError("Method not implemented.", 501);
    }

    async delete(req: Request, res: Response) {}
}
