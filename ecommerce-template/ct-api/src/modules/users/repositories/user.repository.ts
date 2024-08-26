import { BaseRepository } from "@common/repositories/base.repository";
import { IUserRepository } from "./user.repository.interface";
import { User } from "../models/user.model";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UserQueryDto } from "@users/dto/user-query.dto";

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  override async findAll(queryDto?: UserQueryDto): Promise<User[]> {
    const { name, phone, ...paginationOptions } = queryDto;
    const filter: any = {};
    if (name) filter.name = new RegExp(name, "i");
    if (phone) filter.phone = new RegExp(phone, "i");

    return await this.find({ ...paginationOptions, filter });
  }
}
