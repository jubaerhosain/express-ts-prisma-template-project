import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import utils from 'src/utils/utils';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signup(signupDto: SignupDto) {
        const email = signupDto.email;

        const existedUser = await this.usersRepository.findOneByEmail(email);
        if (existedUser) {
            throw new ConflictException({ message: `user already exists with email: ${email}` });
        }

        const hashedPassword = await utils.hashPassword(signupDto.password);
        signupDto.password = hashedPassword;

        signupDto.role = 'USER';

        const createUserDto = plainToInstance(CreateUserDto, signupDto);

        const user = await this.usersRepository.create(createUserDto);
        delete user.password;

        return user;
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.usersRepository.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException({ message: `invalid email or password` });
        }

        const verified = await utils.verifyPassword(password, user.password);

        if (!verified) {
            throw new UnauthorizedException({ message: `invalid email or password` });
        }

        const payload = { sub: user.id, email: user.email, role: user.role };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    logout() {
        return `This action logs out`;
    }
}
