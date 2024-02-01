import { Post } from "@prisma/client";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsRepository } from "./posts.repository";
import { UpdatePostDto } from "./dto/update-post.dto";

export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    async create(postDto: CreatePostDto): Promise<Post> {
        const post = await this.postsRepository.create(postDto);
        return post;
    }

    async update(id: number, updateDto: UpdatePostDto): Promise<Post|null> {
        const post = await this.postsRepository.findOne(id);
        if(!post) return null;

        updateDto.title = updateDto.title ?? post.title;
        updateDto.content = updateDto.content ?? post.content ?? undefined;
        updateDto.published = updateDto.published ?? post.published;

        const updatedPost = await this.postsRepository.update(id, updateDto);
        return updatedPost;
    }
}
