import { Controller, Get, Post, Body, Param, Delete, Logger, HttpStatus, Put, Query } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryDto } from "../dto/category.dto";
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from "@nestjs/swagger";
import { CategoryQueryDto } from "../dto/category-query.dto";
import { PaginatedCategoryDto } from "../dto/paginated-category.dto";
import { UrlParameterPipe } from "src/pipes/url-parameter.pipe";
import { ResponseMessage } from "@decorators/response-message.decorator";

@ApiTags("categories")
@ApiBearerAuth()
@Controller({
  path: "categories",
  version: "1",
})
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CategoryDto,
  })
  @ApiBody({
    type: CreateCategoryDto,
  })
  @ResponseMessage("Created", HttpStatus.CREATED)
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return await this.categoryService.createOne(createCategoryDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedCategoryDto,
  })
  async findAll(@Query() query: CategoryQueryDto): Promise<PaginatedCategoryDto> {
    return await this.categoryService.findAllPaginated(query);
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: CategoryDto,
  })
  async findOne(@Param("id", UrlParameterPipe) id: string): Promise<CategoryDto> {
    return this.categoryService.findOneById(id);
  }

  @Put(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: CategoryDto,
  })
  @ApiBody({
    type: UpdateCategoryDto,
  })
  async update(
    @Param("id", UrlParameterPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.updateOne(id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ResponseMessage("Category deleted successfully", HttpStatus.NO_CONTENT)
  async remove(@Param("id", UrlParameterPipe) id: string): Promise<boolean> {
    return await this.categoryService.deleteOne(id);
  }
}
