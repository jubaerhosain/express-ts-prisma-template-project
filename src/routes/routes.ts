import { Router } from "express";
import { PostsController } from "../posts/posts.controller";
import { PostsRepository } from "../posts/posts.repository";
import { PostsService } from "../posts/posts.service";
import { PrismaClient } from "@prisma/client";

const postsController = new PostsController(new PostsService(new PostsRepository(new PrismaClient())));

export const routes = Router();

routes.post("/posts", postsController.create);
routes.put("/posts/:id", postsController.update);
routes.get("/posts/", postsController.findAll);
routes.get("/posts/:id", postsController.findOne);
routes.delete("/posts", postsController.delete);
