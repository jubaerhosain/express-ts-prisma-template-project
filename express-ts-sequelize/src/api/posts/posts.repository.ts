import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostQueryDto } from "./dto/post-query.dto";
import { Sequelize } from "sequelize-typescript";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { PostDto } from "./dto/post.dto";

export class PostsRepository {
    constructor(private readonly sequelize: Sequelize) {}

    async create(postDto: CreatePostDto): Promise<PostDto> {
        const postObj = instanceToPlain(postDto);
        const post = await this.sequelize.models.Post.create(postObj);
        return post.dataValues;
    }

    async update(id: number, updateDto: UpdatePostDto): Promise<void> {}

    async findOne(id: number): Promise<void> {}

    async findAll(query: PostQueryDto): Promise<PostDto[]> {
        const dbPosts = await this.sequelize.models.Post.findAll({ raw: true });
        const posts: PostDto[] = dbPosts.map((post) => plainToInstance(PostDto, post));
        return posts;
    }
}
