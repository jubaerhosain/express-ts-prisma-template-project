import { BaseRepository } from "@common/repositories/base.repository";
import { IProductRepository } from "./product.repository.interface";
import { Product } from "../models/product.model";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UpdateStockCountDto } from "../dto/update-stock-count.dto";

@Injectable()
export class ProductRepository extends BaseRepository<Product> implements IProductRepository<Product> {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
    super(productModel);
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
