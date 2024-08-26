import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "@common/dto/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto extends BaseResponseDto {
  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  productCount: number;

  @AutoMap()
  @ApiProperty()
  subcategories: CategoryDto[];
}
