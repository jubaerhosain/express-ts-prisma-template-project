import { Controller, Get, Post, Body, Delete, Logger, HttpStatus, Put, Param, Query } from "@nestjs/common";
import { OrderService } from "../services/order.service";
import { OrderDto } from "../dto/order.dto";
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from "@nestjs/swagger";
import { ResponseMessage } from "@decorators/response-message.decorator";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UrlParameterPipe } from "src/pipes/url-parameter.pipe";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { PaginatedOrderDto } from "../dto/paginated-order.dto";
import { OrderQueryDto } from "../dto/order-query.dto";

@ApiTags("orders")
@ApiBearerAuth()
@Controller({
  path: "orders",
  version: "1",
})
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: OrderDto,
  })
  @ApiBody({
    type: CreateOrderDto,
  })
  @ResponseMessage("Created", HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    return await this.orderService.createOne(createOrderDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedOrderDto,
  })
  async findAll(@Query() query: OrderQueryDto): Promise<PaginatedOrderDto> {
    return this.orderService.findAllPaginated(query);
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderDto,
  })
  async findOne(@Param("id", UrlParameterPipe) id: string): Promise<OrderDto> {
    return this.orderService.findOneById(id);
  }

  @Put(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderDto,
  })
  async update(@Param("id", UrlParameterPipe) id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<OrderDto> {
    return this.orderService.updateOne(id, updateOrderDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ResponseMessage("Order deleted successfully", HttpStatus.NO_CONTENT)
  async remove(@Param("id", UrlParameterPipe) id: string): Promise<boolean> {
    return await this.orderService.deleteOne(id);
  }
}
