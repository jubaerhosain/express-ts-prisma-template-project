import { Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";
import { ProductRepository } from "./repositories/product.repository";
import { ProductProfile } from "./product.profile";
import { Product, ProductSchema } from "./models/product.model";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryModule } from "@categories/category.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductProfile, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
