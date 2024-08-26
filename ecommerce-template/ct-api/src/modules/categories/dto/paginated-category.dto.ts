import { BasePaginatedResponseDto } from "@common/dto/base-paginated-response.dto";
import { CategoryDto } from "./category.dto";
import { ApiProperty } from "@nestjs/swagger";

export class PaginatedCategoryDto extends BasePaginatedResponseDto {
  @ApiProperty({ type: [CategoryDto] })
  items: CategoryDto[];
}
