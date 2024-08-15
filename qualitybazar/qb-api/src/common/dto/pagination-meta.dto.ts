import { ApiProperty } from "@nestjs/swagger";

export class PaginationMetaDto {
  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  totalItemCount: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPageCount: number;

  @ApiProperty()
  itemPerPage: number;
}
