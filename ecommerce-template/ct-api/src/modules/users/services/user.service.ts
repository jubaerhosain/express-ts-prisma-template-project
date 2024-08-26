import { ConflictException, Injectable } from "@nestjs/common";
import { IUserService } from "./user.service.interface";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";
import { UserDto } from "../dto/user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { BaseService } from "@common/services/base.service";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { UserQueryDto } from "../dto/user-query.dto";
import { PaginatedUserDto } from "../dto/paginated-user.dto";
import { hashPassword } from "@utils/index";

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto, UserDto> implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(userRepository, {
      mapper,
      model: User,
      createDto: CreateUserDto,
      updateDto: UpdateUserDto,
      responseDto: UserDto,
    });
  }

  override async createOne(createDto: CreateUserDto): Promise<UserDto> {
    const emailExist = await this.userRepository.isExists({ email: createDto.email });
    if (emailExist) throw new ConflictException({ email: "email already in use" });

    const usernameExist = await this.userRepository.isExists({ username: createDto.username });
    if (usernameExist) throw new ConflictException({ email: "username already in use" });

    createDto.password = await hashPassword(createDto.password);

    const user = await this.userRepository.saveOne(createDto);

    return this.mapper.map(user, User, UserDto);
  }

  override async findAllPaginated(queryDto: UserQueryDto): Promise<PaginatedUserDto> {
    const users = await this.userRepository.findAll(queryDto);

    const { page, limit } = queryDto;
    const itemCount = users.length;

    return {
      items: this.mapper.mapArray(users, User, UserDto),
      meta: await this.getPaginationMeta({ page, limit, itemCount }),
    };
  }

  async isEmailExist(email: string): Promise<boolean> {
    const exist = await this.userRepository.isExists({ email });
    return exist ? true : false;
  }
}
