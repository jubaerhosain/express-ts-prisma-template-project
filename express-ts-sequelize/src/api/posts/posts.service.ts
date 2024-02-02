import { CreatePostDto } from "./dto/create-post.dto";
import { PostsRepository } from "./posts.repository";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostQueryDto } from "./dto/post-query.dto";

export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    async create(postDto: CreatePostDto) {
        const post = await this.postsRepository.create(postDto);
        return post;
    }

    async update(id: number, updateDto: UpdatePostDto) {
        const post = await this.postsRepository.findOne(id);
        
        const updatedPost = await this.postsRepository.update(id, updateDto);
        return updatedPost;
    }

    async findAll(query: PostQueryDto)  {
        const posts = await this.postsRepository.findAll(query);
        return posts;
    }
}
