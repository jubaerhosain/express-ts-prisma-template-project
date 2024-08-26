import { BasePaginatedResponseDto } from "@common/dto/base-paginated-response.dto";
import { UserDto } from "./user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class PaginatedUserDto extends BasePaginatedResponseDto {
  @ApiProperty({ type: [UserDto] })
  items: UserDto[];
}
