import { BasePaginatedResponseDto } from "@common/dto/base-paginated-response.dto";
import { OrderDto } from "./order.dto";
import { ApiProperty } from "@nestjs/swagger";

export class PaginatedOrderDto extends BasePaginatedResponseDto {
  @ApiProperty({ type: [OrderDto] })
  items: OrderDto[];
}
