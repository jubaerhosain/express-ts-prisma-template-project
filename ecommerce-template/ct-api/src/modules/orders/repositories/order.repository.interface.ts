import { IBaseRepository } from "@common/repositories/base.repository.interface";
import { BaseModel } from "@common/models/base.model";

export interface IOrderRepository<Order extends BaseModel> extends IBaseRepository<Order> {
  findOneByIdWithProducts(id: string): Promise<Order>;
  findHighestOrderNumber(): Promise<number>;
}
