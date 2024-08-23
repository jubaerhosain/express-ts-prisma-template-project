import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import utils from 'src/utils/utils';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        const email = createUserDto.email;

        const existedUser = await this.usersRepository.findOneByEmail(email);
        if (existedUser) {
            throw new ConflictException({ message: `user already exists with email: ${email}` });
        }

        const hashedPassword = await utils.hashPassword(createUserDto.password);
        createUserDto.password = hashedPassword;

        const user = await this.usersRepository.create(createUserDto);
        delete user.password;

        return user;
    }

    async findAll() {
        const users = await this.usersRepository.findAll();
        const filteredUsers = users.map((user) => {
            delete user.password;
            return user;
        });
        return filteredUsers;
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOne(id);
        delete user.password;
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
