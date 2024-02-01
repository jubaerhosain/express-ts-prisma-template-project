import { Router } from "express";
import { PostsController } from "../posts/posts.controller";
import { PostsRepository } from "../posts/posts.repository";
import { PostsService } from "../posts/posts.service";
import { PrismaClient } from "@prisma/client";
import { validateDto } from "../middlewares/dto-validation.middleware";
import { CreatePostDto } from "./dto/create-post.dto";

const postsController = new PostsController(new PostsService(new PostsRepository(new PrismaClient())));

export const postRoutes = Router();

postRoutes.post("/posts", validateDto(CreatePostDto), postsController.create);
postRoutes.put("/posts/:id", postsController.update);
postRoutes.get("/posts/", postsController.findAll);
postRoutes.get("/posts/:id", postsController.findOne);
postRoutes.delete("/posts", postsController.delete);
