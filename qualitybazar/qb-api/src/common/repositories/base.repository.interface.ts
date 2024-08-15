import { PartialDeep } from "type-fest";
import { BaseModel } from "@common/models/base.model";
import { FindOneOptions, FindAllOptions, DeletionType } from "@common/types";

export interface IBaseRepository<T extends BaseModel> {
  getOneInstance(data: PartialDeep<T>): T;
  getAllInstance(data: PartialDeep<T>[]): T[];
  isExists(filterBy: PartialDeep<T>): Promise<boolean>;
  saveOne(data: PartialDeep<T>): Promise<T>;
  saveAll(data: PartialDeep<T>[]): Promise<T[]>;
  findOne(options: FindOneOptions<T>): Promise<T>;
  findOneById(id: string): Promise<T>;
  findAll(options?: FindAllOptions<T>): Promise<T[]>;
  updateOne(id: string, data: PartialDeep<T>): Promise<boolean>;
  deleteOne(id: string, type?: DeletionType): Promise<boolean>;
  deleteAll(ids: string[], type?: DeletionType): Promise<boolean>;
  countTotalItem(): Promise<number>;
}
