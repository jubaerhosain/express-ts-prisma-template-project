import { Router } from "express";
import { PostsController } from "../posts/posts.controller";
import { PostsRepository } from "../posts/posts.repository";
import { PostsService } from "../posts/posts.service";
import { validateDto } from "../../middlewares/dto-validation.middleware";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostQueryDto } from "./dto/post-query.dto";

import { prismaClient } from "../../prisma/prisma.client";
const postsController = new PostsController(new PostsService(new PostsRepository(prismaClient)));

export const postRoutes = Router();

postRoutes.post("/posts", validateDto(CreatePostDto, "body"), postsController.create.bind(postsController));
postRoutes.put("/posts/:id", validateDto(UpdatePostDto, "body"), postsController.update.bind(postsController));
postRoutes.get("/posts", validateDto(PostQueryDto, "query"), postsController.findAll.bind(postsController));
postRoutes.get("/posts/:id", postsController.findOne.bind(postsController));
postRoutes.delete("/posts", postsController.delete.bind(postsController));
