import { IBaseService } from "@common/services/base.service.interface";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { ProductDto } from "../dto/product.dto";
import { Product } from "../models/product.model";
import { UpdateStockCountDto } from "@products/dto/update-stock-count.dto";

export interface IProductService extends IBaseService<Product, CreateProductDto, UpdateProductDto, ProductDto> {
  findAllByIds(productIds: string[]): Promise<ProductDto[]>;
  updateStockCounts(products: UpdateStockCountDto[]): Promise<void>;
}
