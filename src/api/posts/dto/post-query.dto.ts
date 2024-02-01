import { Transform } from "class-transformer";
import { IsString, IsOptional, IsIn, IsInt, IsPositive, IsBoolean } from "class-validator";

export class PostQueryDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsBoolean()
    @IsOptional()
    published?: boolean;

    @IsString()
    @IsOptional()
    @IsIn(["id", "title", "published"])
    sort?: string;

    @IsIn(["asc", "desc"])
    @IsOptional()
    order?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    limit?: number;
}
