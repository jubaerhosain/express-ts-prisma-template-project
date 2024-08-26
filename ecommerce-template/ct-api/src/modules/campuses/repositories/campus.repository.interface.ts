import { IBaseRepository } from "@common/repositories/base.repository.interface";
import { BaseModel } from "@common/models/base.model";

export interface ICampusRepository<Campus extends BaseModel> extends IBaseRepository<Campus> {
  isUniqueName(name: string): Promise<boolean>;
}
