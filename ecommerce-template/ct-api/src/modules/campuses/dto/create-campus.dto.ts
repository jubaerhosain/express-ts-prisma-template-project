import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import { Address } from "@common/models/address.model";
import { Type } from "class-transformer";

export class CreateCampusDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @ApiProperty({ type: Address, required: false })
  @ValidateNested()
  @Type(() => Address)
  @IsObject()
  @IsNotEmpty()
  address: Address;

  @AutoMap()
  @ApiProperty()
  @ArrayUnique()
  @ArrayMinSize(1)
  @IsArray()
  halls: string[];
}
