import { BaseRepository } from "@common/repositories/base.repository";
import { IOrderRepository } from "./order.repository.interface";
import { Order } from "../models/order.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { OrderQueryDto } from "@orders/dto/order-query.dto";

@Injectable()
export class OrderRepository extends BaseRepository<Order> implements IOrderRepository<Order> {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {
    super(orderModel);
  }

  async findOneByIdWithProducts(id: string): Promise<Order> {
    return await this.orderModel.findById(id).populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
      },
    });
  }

  async findHighestOrderNumber(): Promise<number> {
    const order = await this.orderModel.findOne({}, {}, { sort: { orderNumber: -1 } });
    if (!order) return 10000;
    return order.orderNumber;
  }

  override async findAll(queryDto?: OrderQueryDto): Promise<Order[]> {
    const { ...paginationOptions } = queryDto;

    return this.find({
      ...paginationOptions,
      relations: {
        path: "items",
        populate: {
          path: "product",
          model: "Product",
        },
      },
    });
  }
}
