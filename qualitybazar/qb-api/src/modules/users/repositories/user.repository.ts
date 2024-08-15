import { BaseRepository } from "@common/repositories/base.repository";
import { IUserRepository } from "./user.repository.interface";
import { User } from "../models/user.model";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
}
