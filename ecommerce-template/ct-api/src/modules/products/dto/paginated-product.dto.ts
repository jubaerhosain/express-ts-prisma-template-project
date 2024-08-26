import { BasePaginatedResponseDto } from "@common/dto/base-paginated-response.dto";
import { ProductDto } from "./product.dto";
import { ApiProperty } from "@nestjs/swagger";

export class PaginatedProductDto extends BasePaginatedResponseDto {
  @ApiProperty({ type: [ProductDto] })
  items: ProductDto[];
}
