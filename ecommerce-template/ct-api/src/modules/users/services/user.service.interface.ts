import { IBaseService } from "@common/services/base.service.interface";
import { CreateUserDto } from "@users/dto/create-user.dto";
import { UpdateUserDto } from "@users/dto/update-user.dto";
import { UserDto } from "@users/dto/user.dto";
import { User } from "@users/models/user.model";

export interface IUserService extends IBaseService<User, CreateUserDto, UpdateUserDto, UserDto> {
  isEmailExist(email: string): Promise<boolean>;
}
