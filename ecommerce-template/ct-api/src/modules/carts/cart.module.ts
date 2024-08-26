import { Module } from "@nestjs/common";
import { CartService } from "./services/cart.service";
import { CartController } from "./controllers/cart.controller";
import { CartRepository } from "./repositories/cart.repository";
import { CartProfile } from "./cart.profile";
import { Cart, CartSchema } from "./models/cart.model";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "@products/product.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]), ProductModule],
  controllers: [CartController],
  providers: [CartService, CartProfile, CartRepository],
})
export class CartModule {}
