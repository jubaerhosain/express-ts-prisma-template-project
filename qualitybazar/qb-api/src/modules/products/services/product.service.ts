import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IProductService } from "./product.service.interface";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product.model";
import { ProductDto } from "../dto/product.dto";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { BaseService } from "@common/services/base.service";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { UpdateStockCountDto } from "../dto/update-stock-count.dto";
import { CategoryService } from "@categories/services/category.service";
import { ProductQueryDto } from "../dto/product-query.dto";
import { PaginatedProductDto } from "../dto/paginated-product.dto";

@Injectable()
export class ProductService
  extends BaseService<Product, CreateProductDto, UpdateProductDto, ProductDto>
  implements IProductService
{
  constructor(
    private readonly productRepository: ProductRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly categoryService: CategoryService,
  ) {
    super(productRepository, {
      mapper,
      model: Product,
      createDto: CreateProductDto,
      updateDto: UpdateProductDto,
      responseDto: ProductDto,
    });
  }

  override async createOne(createDto: CreateProductDto): Promise<ProductDto> {
    const categories = await this.categoryService.findAllByNames(createDto.categories);

    if (categories.length != createDto.categories.length) throw new NotFoundException("categories not found");

    const product = await this.productRepository.saveOne(createDto);

    return this.mapper.map(product, Product, ProductDto);
  }

  override async findAllPaginated(query: ProductQueryDto): Promise<PaginatedProductDto> {
    const { page, limit, sortBy, sortOrder, name, maxPrice, minPrice, categories } = query;
    const filter: any = {};

    if (name) filter.name = new RegExp(name, "i");

    if (maxPrice && minPrice) {
      filter.price = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    }

    // move this to dto validation
    const parse = (categories: string): [string] => {
      try {
        let parsedCategories = JSON.parse(categories);
        parsedCategories = parsedCategories.map((category: string) => new RegExp(category, "i"));
        return parsedCategories;
      } catch (error) {
        console.log(categories, error);
        throw new BadRequestException({ categories: "categories mus be an array of strings" });
      }
    };

    if (categories) {
      const parsedCategories = parse(categories);
      filter.categories = { $in: parsedCategories };
    }

    return this.paginate({
      page,
      limit,
      sortBy,
      sortOrder,
      filter: {
        ...filter,
      },
    });
  }

  async findAllByIds(productIds: string[]): Promise<ProductDto[]> {
    const products = await this.productRepository.findAllProductByIds(productIds);

    const foundProductIds = products.map((product) => product.id);
    const missingIds = productIds.filter((id) => !foundProductIds.includes(id));

    if (missingIds.length > 0) throw new NotFoundException(`following products not found: [${missingIds.join(", ")}]`);

    const mappedProducts = this.mapper.mapArray<Product, ProductDto>(products, Product, ProductDto);
    return mappedProducts;
  }

  async updateStockCounts(products: UpdateStockCountDto[]): Promise<void> {
    return await this.productRepository.updateAllStockCount(products);
  }
}
