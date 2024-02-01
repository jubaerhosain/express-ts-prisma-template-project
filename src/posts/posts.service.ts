import { Post } from "@prisma/client";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsRepository } from "./posts.repository";

export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    async create(postDto: CreatePostDto): Promise<Post> {
        const post = await this.postsRepository.create(postDto);
        return post;
    }
}
