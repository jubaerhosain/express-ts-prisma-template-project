import { IBaseService } from "@common/services/base.service.interface";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { OrderDto } from "../dto/order.dto";
import { Order } from "../models/order.model";

export interface IOrderService extends IBaseService<Order, CreateOrderDto, UpdateOrderDto, OrderDto> {
  findOneById(id: string): Promise<OrderDto>;
}
