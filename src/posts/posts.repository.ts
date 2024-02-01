import { Post, PrismaClient } from "@prisma/client";
import { CreatePostDto } from "./dto/create-post.dto";

export class PostsRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(postDto: CreatePostDto): Promise<Post> {
        const post = await this.prisma.post.create({
            data: postDto,
        });
        return post;
    }
}
