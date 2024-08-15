import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "@common/dto/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { CartItemDto } from "./cart-item.dto";

export class CartDto extends BaseResponseDto {
  @AutoMap()
  @ApiProperty({ type: [CartItemDto] })
  items: CartItemDto[];
}
