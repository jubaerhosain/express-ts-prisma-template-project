import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CampusAddress {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  details: string;
}
