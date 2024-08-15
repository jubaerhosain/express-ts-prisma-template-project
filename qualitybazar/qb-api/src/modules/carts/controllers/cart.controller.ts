import { Controller, Get, Post, Body, Delete, Logger, HttpStatus, Put } from "@nestjs/common";
import { CartService } from "../services/cart.service";
import { CartDto } from "../dto/cart.dto";
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from "@nestjs/swagger";
import { ResponseMessage } from "@decorators/response-message.decorator";
import { CreateCartItemDto } from "../dto/create-cart-item.dto";
import { UpdateCartItemDto } from "../dto/update-cart-item.dto";

@ApiTags("carts")
@ApiBearerAuth()
@Controller({
  path: "carts",
  version: "1",
})
export class CartController {
  private readonly logger = new Logger(CartController.name);
  constructor(private readonly cartService: CartService) {}

  @Post("me/items")
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CartDto,
  })
  @ApiBody({
    type: CreateCartItemDto,
  })
  @ResponseMessage("Created", HttpStatus.CREATED)
  async addCartItem(@Body() addCartItemDto: CreateCartItemDto): Promise<CartDto> {
    return this.cartService.addCartItem(addCartItemDto);
  }

  @Get("/me")
  @ApiResponse({
    status: HttpStatus.OK,
    type: CartDto,
  })
  async findOne(): Promise<CartDto> {
    const userId = "663f1b4354f02fff07444bdc";
    return this.cartService.findOneByUserId(userId);
  }

  @Put("me/items")
  @ApiResponse({
    status: HttpStatus.OK,
    type: CartDto,
  })
  @ApiBody({
    type: UpdateCartItemDto,
  })
  async update(@Body() updateCartItemDto: UpdateCartItemDto): Promise<CartDto> {
    return await this.cartService.updateCartItem(updateCartItemDto);
  }

  @Delete("me")
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ResponseMessage("Cart deleted successfully", HttpStatus.NO_CONTENT)
  async remove(): Promise<boolean> {
    const id = "";
    return await this.cartService.deleteOne(id);
  }
}
