import { Injectable, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { IOrderService } from "./order.service.interface";
import { OrderRepository } from "../repositories/order.repository";
import { Order } from "../models/order.model";
import { OrderDto } from "../dto/order.dto";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { BaseService } from "@common/services/base.service";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { ProductService } from "@products/services/product.service";
import { UpdateStockCountDto } from "@products/dto/update-stock-count.dto";
import { OrderQueryDto } from "../dto/order-query.dto";
import { PaginatedOrderDto } from "../dto/paginated-order.dto";

@Injectable()
export class OrderService
  extends BaseService<Order, CreateOrderDto, UpdateOrderDto, OrderDto>
  implements IOrderService
{
  constructor(
    private readonly orderRepository: OrderRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly productService: ProductService,
  ) {
    super(orderRepository, {
      mapper,
      model: Order,
      createDto: CreateOrderDto,
      updateDto: UpdateOrderDto,
      responseDto: OrderDto,
    });
  }

  override async createOne(createOrderDto: CreateOrderDto): Promise<OrderDto> {
    // verify phone number before confirming order?

    // add optional userId
    const { items, ...otherProperties } = createOrderDto;

    const productIds = items.map((item) => item.productId);

    const products = await this.productService.findAllByIds(productIds);

    const getPriceAndStock = (productId: string): { pricePerItem: number; stockCount: number } => {
      for (const product of products) {
        if (product.id == productId) {
          return {
            pricePerItem: product.finalPrice,
            stockCount: product.stockCount,
          };
        }
      }
      throw new NotFoundException(`product with id ${productId} not found`);
    };

    let totalPrice = 0;
    const updatedStockCounts: UpdateStockCountDto[] = [];

    // calculate price and updated stock
    const orderItems = items.map((item) => {
      const { pricePerItem, stockCount } = getPriceAndStock(item.productId);

      if (item.quantity > stockCount)
        throw new PreconditionFailedException(`product ${item.productId} is out of stock`);

      updatedStockCounts.push({ id: item.productId, stockCount: stockCount - item.quantity });

      totalPrice += pricePerItem * item.quantity;
      return { quantity: item.quantity, product: item.productId, pricePerItem };
    });

    const highestOrderNumber = await this.orderRepository.findHighestOrderNumber();
    const orderData = { items: orderItems, totalPrice, ...otherProperties, orderNumber: highestOrderNumber + 1 };

    // create order
    const createdOrder = await this.orderRepository.saveOne(orderData);

    // update stockCount for products
    await this.productService.updateStockCounts(updatedStockCounts);

    const orderResponse = await this.findOneById(createdOrder.id);
    return orderResponse;
  }

  override async findOneById(id: string): Promise<OrderDto> {
    const data = await this.orderRepository.findOneByIdWithProducts(id);

    if (!data) throw new NotFoundException("order not found");

    return this.mapper.map(data, Order, OrderDto);
  }

  override async findAllPaginated(query: OrderQueryDto): Promise<PaginatedOrderDto> {
    const { page, limit, sortBy, sortOrder } = query;
    return this.paginate({
      page,
      limit,
      sortBy,
      sortOrder,
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
