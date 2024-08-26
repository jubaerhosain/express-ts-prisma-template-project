import { BaseRepository } from "@common/repositories/base.repository";
import { IProductRepository } from "./product.repository.interface";
import { Product } from "../models/product.model";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateStockCountDto } from "../dto/update-stock-count.dto";
import { ProductQueryDto } from "@products/dto/product-query.dto";

@Injectable()
export class ProductRepository extends BaseRepository<Product> implements IProductRepository<Product> {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
    super(productModel);
  }

  override async findAll(queryDto?: ProductQueryDto): Promise<Product[]> {
    const { name, maxPrice, minPrice, categories, ...paginationOptions } = queryDto;
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

    return await this.find({ ...paginationOptions, filter });
  }

  async findAllProductByIds(productIds: string[]): Promise<Product[]> {
    return await this.productModel.find({ _id: { $in: productIds } });
  }

  async updateAllStockCount(products: UpdateStockCountDto[]): Promise<void> {
    const bulkOptions = products.map((product) => ({
      updateOne: {
        filter: { _id: product.id },
        update: { $set: { stockCount: product.stockCount } },
      },
    }));

    await this.productModel.bulkWrite(bulkOptions);
  }
}
