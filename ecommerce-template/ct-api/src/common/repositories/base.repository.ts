import { PartialDeep } from "type-fest";
import { IBaseRepository } from "./base.repository.interface";
import { Model } from "mongoose";
import { BaseModel } from "../models/base.model";
import { NotFoundException } from "@nestjs/common";
import { DeletionType, FindAllOptions, FindOneOptions } from "@common/types";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { SortOrder } from "@common/enums/sort-order.enum";

export class BaseRepository<T extends BaseModel> implements IBaseRepository<T> {
  constructor(private readonly _model: Model<T>) {}

  getOneInstance(data: PartialDeep<T>): T {
    return new this._model(data);
  }

  getAllInstance(data: PartialDeep<T>[]): T[] {
    return data.map((partial) => new this._model(partial));
  }

  async isExists(filterBy: PartialDeep<T>): Promise<boolean> {
    const exist = await this._model.exists(filterBy);
    return exist ? true : false;
  }

  async saveOne(data: PartialDeep<T>): Promise<T> {
    const savedData = new this._model(data);
    await savedData.save();
    return savedData;
  }

  async saveAll(data: PartialDeep<T>[]): Promise<T[]> {
    console.log(data);
    throw new Error("Method not implemented.");
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    const { filter = {}, relations = [] } = options;
    const data = await this._model.findOne({ ...filter }).populate(relations);
    return data;
  }

  async findOneById(id: string | number, relations?: string[]): Promise<T> {
    const data = await this._model.findById(id).populate(relations);
    return data;
  }

  protected async find(query?: FindAllOptions<T>): Promise<T[]> {
    const {
      page = 1,
      limit = 30,
      sortBy = "createdAt",
      sortOrder = SortOrder.desc,
      filter = {},
      relations = [],
    } = query ? query : ({} as any);

    const order = { [sortBy]: sortOrder };

    const list = await this._model
      .find({ ...filter })
      .sort(order)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(relations);

    return list;
  }

  async findAll(queryDto?: BaseQueryDto): Promise<T[]> {
    const { page, limit, sortBy, sortOrder } = queryDto ?? {};
    return this.find({ page, limit, sortBy, sortOrder });
  }

  async updateOne(id: string, data: PartialDeep<T>): Promise<boolean> {
    const updatedOption = await this._model.updateOne({ _id: id }, { $set: { ...data } });
    if (!updatedOption.matchedCount) throw new NotFoundException("NOT FOUND");
    return true;
  }

  async deleteOne(id: string, type?: DeletionType): Promise<boolean> {
    if (type === DeletionType.SOFT) {
      const updatedOption = await this._model.updateOne({ _id: id }, { $set: { deletedAt: Date.now() } });
      if (!updatedOption.matchedCount) throw new NotFoundException("NOT FOUND");
    } else {
      const deleteOption = await this._model.deleteOne({ _id: id });
      if (!deleteOption.deletedCount) throw new NotFoundException("NOT FOUND");
    }
    return true;
  }

  deleteAll(ids: string[] | number[], type?: DeletionType): Promise<boolean> {
    console.log(ids, type);
    throw new Error("Method not implemented.");
  }

  async countTotalItem(): Promise<number> {
    const count = await this._model.estimatedDocumentCount();
    return count;
  }
}
