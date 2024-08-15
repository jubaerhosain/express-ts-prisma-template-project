import { Controller, Get, Post, Body, Param, Delete, Logger, HttpStatus, Put, Query } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { ProductDto } from "../dto/product.dto";
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from "@nestjs/swagger";
import { ProductQueryDto } from "../dto/product-query.dto";
import { PaginatedProductDto } from "../dto/paginated-product.dto";
import { UrlParameterPipe } from "src/pipes/url-parameter.pipe";
import { ResponseMessage } from "@decorators/response-message.decorator";

@ApiTags("products")
@ApiBearerAuth()
@Controller({
  path: "products",
  version: "1",
})
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ProductDto,
  })
  @ApiBody({
    type: CreateProductDto,
  })
  @ResponseMessage("Created", HttpStatus.CREATED)
  async create(@Body() CreateProductDto: CreateProductDto): Promise<ProductDto> {
    return await this.productService.createOne(CreateProductDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedProductDto,
  })
  async findAll(@Query() query: ProductQueryDto): Promise<PaginatedProductDto> {
    return await this.productService.findAllPaginated(query);
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductDto,
  })
  async findOne(@Param("id", UrlParameterPipe) id: string): Promise<ProductDto> {
    return this.productService.findOneById(id);
  }

  @Put(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductDto,
  })
  @ApiBody({
    type: UpdateProductDto,
  })
  async update(
    @Param("id", UrlParameterPipe) id: string,
    @Body() UpdateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return await this.productService.updateOne(id, UpdateProductDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ResponseMessage("Product deleted successfully", HttpStatus.NO_CONTENT)
  async remove(@Param("id", UrlParameterPipe) id: string): Promise<boolean> {
    return await this.productService.deleteOne(id);
  }
}
