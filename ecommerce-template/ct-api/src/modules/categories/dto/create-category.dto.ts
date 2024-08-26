import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @AutoMap()
  @ApiProperty({ description: "name of the category" })
  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  name: string;
}
