import { IsNotEmpty, IsString, IsEmail, IsIn, IsOptional } from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['USER'])
    @IsOptional()
    role?: string;
}
