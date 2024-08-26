import { IBaseRepository } from "@common/repositories/base.repository.interface";
import { BaseModel } from "@common/models/base.model";

export interface IUserRepository<User extends BaseModel> extends IBaseRepository<User> {}
