import { PrismaClient } from "@prisma/client";
import { CreatePostDto } from "./dto/create-post.dto";

export class PostsRepository {
    constructor(private prisma: PrismaClient) {}

    create(postDto: CreatePostDto) {
        // this.prisma.post.create({
        //     data: postDto,
        // });
        return postDto;
    }
}
