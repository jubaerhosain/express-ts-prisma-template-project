import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsIn, IsInt, IsPositive } from 'class-validator';

export class BookQueryDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    author?: string;

    @IsString()
    @IsOptional()
    genre?: string;

    @IsString()
    @IsOptional()
    @IsIn(['id', 'author', 'title', 'price'])
    sort?: string;

    @IsIn(['asc', 'desc'])
    @IsOptional()
    order?: string;

    @IsInt()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    offset: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    limit?: number;
}
