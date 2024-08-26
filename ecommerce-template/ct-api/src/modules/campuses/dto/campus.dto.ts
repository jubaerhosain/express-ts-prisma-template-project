import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "@common/dto/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Address } from "@common/models/address.model";

export class CampusDto extends BaseResponseDto {
  @AutoMap()
  @ApiProperty()
  slug: string;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty({ type: Address })
  address: Address;
}
