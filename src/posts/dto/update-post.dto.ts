import { IsString, IsBoolean, IsOptional, MinLength, IsNotEmpty } from "class-validator";

export class UpdatePostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsBoolean()
    @IsOptional()
    published?: boolean;
}
