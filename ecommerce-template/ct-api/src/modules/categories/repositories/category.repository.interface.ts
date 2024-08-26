import { IBaseRepository } from "@common/repositories/base.repository.interface";
import { BaseModel } from "@common/models/base.model";

export interface ICategoryRepository<Category extends BaseModel> extends IBaseRepository<Category> {
  findAllCategoryByNames(names: string[]): Promise<Category[]>;
}
