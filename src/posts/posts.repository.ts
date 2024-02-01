import { Post, PrismaClient } from "@prisma/client";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

export class PostsRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(postDto: CreatePostDto): Promise<Post> {
        const post = await this.prisma.post.create({
            data: postDto,
        });
        return post;
    }

    async update(id: number, updateDto: UpdatePostDto): Promise<Post | null> {
        const post = await this.prisma.post.update({
            where: { id: id },
            data: updateDto,
        });
        return null;
    }

    async findOne(id: number): Promise<Post | null> {
        const post = await this.prisma.post.findUnique({ where: { id } });
        return post;
    }
}
