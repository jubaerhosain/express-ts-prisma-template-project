import { BasePaginatedResponseDto } from "@common/dto/base-paginated-response.dto";
import { CampusDto } from "./campus.dto";
import { ApiProperty } from "@nestjs/swagger";

export class PaginatedCampusDto extends BasePaginatedResponseDto {
  @ApiProperty({ type: [CampusDto] })
  items: CampusDto[];
}
