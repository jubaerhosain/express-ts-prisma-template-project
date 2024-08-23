import { Controller, Post, Body, Delete, HttpCode, HttpStatus, Response, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Public } from '../../decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Response({ passthrough: true }) res: any) {
        const { accessToken } = await this.authService.login(loginDto);

        res.cookie('accessToken', accessToken, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: 'strict',
            httpOnly: true,
            signed: true,
        });

        return {
            message: 'logged in successfully',
            accessToken,
        };
    }

    @Get('/refresh-token')
    refreshToken() {}

    @Delete('logout')
    // @Roles(Role.USER)
    logout() {
        return "logged out successfully";
        // return this.authService.logout();
    }
}
