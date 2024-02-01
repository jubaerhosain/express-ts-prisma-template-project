import { IsString, IsBoolean, IsOptional, MinLength, IsNotEmpty } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsBoolean()
    published: boolean;
}
