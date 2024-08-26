import { Injectable, NotFoundException } from "@nestjs/common";
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

  override async findAllPaginated(queryDto: ProductQueryDto): Promise<PaginatedProductDto> {
    const products = await this.productRepository.findAll(queryDto);

    const { page, limit } = queryDto;
    const itemCount = products.length;

    return {
      items: this.mapper.mapArray(products, Product, ProductDto),
      meta: await this.getPaginationMeta({ page, limit, itemCount }),
    };
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
