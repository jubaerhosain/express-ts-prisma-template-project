import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ICategoryService } from "./category.service.interface";
import { CategoryRepository } from "../repositories/category.repository";
import { Category } from "../models/category.model";
import { CategoryDto } from "../dto/category.dto";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { BaseService } from "@common/services/base.service";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CategoryQueryDto } from "../dto/category-query.dto";
import { PaginatedCategoryDto } from "../dto/paginated-category.dto";

@Injectable()
export class CategoryService
  extends BaseService<Category, CreateCategoryDto, UpdateCategoryDto, CategoryDto>
  implements ICategoryService
{
  constructor(
    private readonly categoryRepository: CategoryRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(categoryRepository, {
      mapper,
      model: Category,
      createDto: CreateCategoryDto,
      updateDto: UpdateCategoryDto,
      responseDto: CategoryDto,
    });
  }

  override async createOne(createDto: CreateCategoryDto): Promise<CategoryDto> {
    const exist = await this.categoryRepository.isNameExist(createDto.name);
    if (exist) throw new ConflictException({ name: "category already exists" });

    const category = await this.categoryRepository.saveOne(createDto);

    return this.mapper.map(category, Category, CategoryDto);
  }

  async createSubCategory(parentId: string, createDto: CreateCategoryDto): Promise<CategoryDto> {
    const parent = await this.findOneById(parentId);
    if (parent) throw new NotFoundException("Parent category not found");

    const exist = await this.categoryRepository.isNameExist(createDto.name);
    if (exist) throw new ConflictException({ name: "category already exists" });

    const category = await this.categoryRepository.saveOne({ ...createDto, parent: parentId });

    return this.mapper.map(category, Category, CategoryDto);
  }

  async findOneByName(name: string): Promise<CategoryDto> {
    const data = await this.categoryRepository.findOne({ filter: { name } });
    const category = this.mapper.map<Category, CategoryDto>(data, Category, CategoryDto);
    return category;
  }

  async findAllByNames(names: string[]): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.findAllCategoryByNames(names);

    const foundNames = categories.map((category) => category.name);
    const missingNames = names.filter((name) => !foundNames.includes(name));

    if (missingNames.length > 0)
      throw new NotFoundException(`following categories not found: [${missingNames.join(", ")}]`);

    const mappedCategories = this.mapper.mapArray<Category, CategoryDto>(categories, Category, CategoryDto);
    return mappedCategories;
  }

  async findAllPaginated(query: CategoryQueryDto): Promise<PaginatedCategoryDto> {
    const categories = await this.categoryRepository.findAll(query);

    const { page, limit } = query;
    const itemCount = categories.length;

    return {
      items: this.mapper.mapArray(categories, Category, CategoryDto),
      meta: await this.getPaginationMeta({ page, limit, itemCount }),
    };
  }

  override async updateOne(id: string, updateDto: UpdateCategoryDto): Promise<CategoryDto> {
    if (updateDto.name) {
      const exist = await this.categoryRepository.isNameExist(updateDto.name);
      if (exist) throw new ConflictException({ name: "category already exists" });
    }

    await this.categoryRepository.updateOne(id, updateDto);
    return null;
  }
}
