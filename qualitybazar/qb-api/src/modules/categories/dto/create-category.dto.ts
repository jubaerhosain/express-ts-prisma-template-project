import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @AutoMap()
  @ApiProperty({ description: "name of the category" })
  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @ApiProperty({ description: "details of the category", required: false })
  @IsString()
  @Length(3, 255)
  @IsOptional()
  details: string;
}
