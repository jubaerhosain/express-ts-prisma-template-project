import { Module } from "@nestjs/common";
import { CategoryService } from "./services/category.service";
import { CategoryController } from "./controllers/category.controller";
import { CategoryRepository } from "./repositories/category.repository";
import { CategoryProfile } from "./category.profile";
import { Category, CategorySchema } from "./models/category.model";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryProfile, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
