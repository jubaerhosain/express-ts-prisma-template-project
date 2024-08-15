import { IBaseService } from "@common/services/base.service.interface";
import { Category } from "../models/category.model";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryDto } from "../dto/category.dto";

export interface ICategoryService extends IBaseService<Category, CreateCategoryDto, UpdateCategoryDto, CategoryDto> {
  findOneByName(name: string): Promise<CategoryDto>;
  findAllByNames(names: string[]): Promise<CategoryDto[]>;
}
