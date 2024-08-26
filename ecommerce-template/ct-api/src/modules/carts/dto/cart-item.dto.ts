import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "@products/dto/product.dto";

export class CartItemDto {
  @AutoMap()
  @ApiProperty()
  quantity: number;

  @AutoMap()
  @ApiProperty({ type: ProductDto })
  product: ProductDto;
}
