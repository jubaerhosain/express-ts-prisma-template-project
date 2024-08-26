import { ApiProperty } from "@nestjs/swagger";
import { PaginationMetaDto } from "./pagination-meta.dto";

export class BasePaginatedResponseDto {
  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;

  @ApiProperty({ type: [Object] })
  items: any[];
}

/**
 * Override 'items' property in child dto with appropriate type
 * export class PaginatedUserResponseDto extends BasePaginatedResponseDto {
 *    @ApiProperty({ type: [UserResponseDto] })
 *    items: UserResponseDto[];
 * }
 */
