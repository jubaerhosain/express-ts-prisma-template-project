import { BaseRepository } from "@common/repositories/base.repository";
import { ICategoryRepository } from "./category.repository.interface";
import { Category } from "../models/category.model";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CategoryQueryDto } from "@categories/dto/category-query.dto";

@Injectable()
export class CategoryRepository extends BaseRepository<Category> implements ICategoryRepository<Category> {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {
    super(categoryModel);
  }

  async isNameExist(name: string): Promise<boolean> {
    const exist = await this.categoryModel.exists({ name: new RegExp(`^${name}$`, "i") });
    return exist ? true : false;
  }

  async findAllCategoryByNames(names: string[]): Promise<Category[]> {
    return await this.categoryModel.find({ name: { $in: names } });
  }

  override async findAll(query?: CategoryQueryDto): Promise<Category[]> {
    const { name, parent, ...paginationOptions } = query ?? {};
    const filter: any = {};
    if (name) filter.name = new RegExp(name, "i");
    if (parent) filter.parent = parent;

    return this.find({ ...paginationOptions, filter });
  }
}
