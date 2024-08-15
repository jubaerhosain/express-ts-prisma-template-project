import { IBaseService } from "@common/services/base.service.interface";
import { CreateCartDto } from "../dto/create-cart.dto";
import { UpdateCartDto } from "../dto/update-cart.dto";
import { CartDto } from "../dto/cart.dto";
import { Cart } from "../models/cart.model";
import { CreateCartItemDto } from "@carts/dto/create-cart-item.dto";
import { UpdateCartItemDto } from "@carts/dto/update-cart-item.dto";

export interface ICartService extends IBaseService<Cart, CreateCartDto, UpdateCartDto, CartDto> {
  findOneByUserId(userId: string): Promise<CartDto>;
  addCartItem(addCartItemDto: CreateCartItemDto): Promise<CartDto>;
  updateCartItem(updateCartItemDto: UpdateCartItemDto): Promise<CartDto>;
}
