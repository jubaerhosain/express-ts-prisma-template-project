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
    const exist = await this.isEmailExist(createDto.email);
    if (exist) throw new ConflictException({ email: "email already in use" });

    createDto.password = createDto.password ? "hashed" : null;

    const user = await this.userRepository.saveOne(createDto);

    return this.mapper.map(user, User, UserDto);
  }

  override async findAllPaginated(query: UserQueryDto): Promise<PaginatedUserDto> {
    const { page, limit, sortBy, sortOrder, name, phone } = query;
    const filter: any = {};
    if (name) filter.name = new RegExp(name, "i");
    if (phone) filter.phone = new RegExp(phone, "i");

    return this.paginate({ page, limit, sortBy, sortOrder, filter: { ...filter } });
  }

  async isEmailExist(email: string): Promise<boolean> {
    const exist = await this.userRepository.isExists({ email });
    return exist ? true : false;
  }
}
