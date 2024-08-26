import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Min,
  ValidateNested,
} from "class-validator";
import { Discount } from "../models/discount.model";
import { Transform, Type } from "class-transformer";
import { ProductMeta } from "../models/product-meta.model";

export class CreateProductDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @ApiProperty()
  @Min(0)
  @IsNumber()
  @Transform((value) => {
    return Number(value.value);
  })
  @IsNotEmpty({ message: "price must be provided" })
  price: number;

  @AutoMap()
  @ApiProperty()
  @Min(0)
  @IsInt()
  @IsNumber()
  @Transform((value) => {
    return Number(value.value);
  })
  @IsNotEmpty()
  stockCount: number;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  details: string;

  @AutoMap()
  @ApiProperty()
  @IsString({ each: true })
  @ArrayUnique()
  @ArrayMinSize(1)
  @IsArray()
  categories: string[];

  @AutoMap()
  @ApiProperty()
  @IsString({ each: true })
  @ArrayUnique()
  @ArrayMinSize(1)
  @IsArray()
  images: string[];

  @AutoMap()
  @ApiProperty({ type: Discount, required: false })
  @ValidateNested()
  @Type(() => Discount)
  @IsObject()
  @IsOptional()
  discount: Discount;

  @AutoMap()
  @ApiProperty({ type: ProductMeta })
  @Type(() => ProductMeta)
  @IsObject()
  @IsOptional()
  meta: ProductMeta;
}
