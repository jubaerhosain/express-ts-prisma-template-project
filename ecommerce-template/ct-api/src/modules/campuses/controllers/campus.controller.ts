import { Controller, Get, Post, Body, Param, Delete, Logger, HttpStatus, Put, Query } from "@nestjs/common";
import { CampusService } from "../services/campus.service";
import { CreateCampusDto } from "../dto/create-campus.dto";
import { UpdateCampusDto } from "../dto/update-campus.dto";
import { CampusDto } from "../dto/campus.dto";
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from "@nestjs/swagger";
import { CampusQueryDto } from "../dto/campus-query.dto";
import { PaginatedCampusDto } from "../dto/paginated-campus.dto";
import { UrlParameterPipe } from "src/pipes/url-parameter.pipe";
import { ResponseMessage } from "@decorators/response-message.decorator";

@ApiTags("campuses")
@ApiBearerAuth()
@Controller({
  path: "campuses",
  version: "1",
})
export class CampusController {
  private readonly logger = new Logger(CampusController.name);
  constructor(private readonly userService: CampusService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CampusDto,
  })
  @ApiBody({
    type: CreateCampusDto,
  })
  @ResponseMessage("Campus added successfully", HttpStatus.CREATED)
  async create(@Body() createCampusDto: CreateCampusDto): Promise<CampusDto> {
    return await this.userService.createOne(createCampusDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedCampusDto,
  })
  async findAll(@Query() query: CampusQueryDto): Promise<PaginatedCampusDto> {
    return await this.userService.findAllPaginated(query);
  }

  @Get(":slug")
  @ApiResponse({
    status: HttpStatus.OK,
    type: CampusDto,
  })
  async findOne(@Param("slug") slug: string): Promise<CampusDto> {
    return this.userService.findOne({ slug });
  }

  @Put(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: CampusDto,
  })
  @ApiBody({
    type: UpdateCampusDto,
  })
  async update(
    @Param("id", UrlParameterPipe) id: string,
    @Body() updateCampusDto: UpdateCampusDto,
  ): Promise<CampusDto> {
    return await this.userService.updateOne(id, updateCampusDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ResponseMessage("Campus deleted successfully", HttpStatus.NO_CONTENT)
  async delete(@Param("id", UrlParameterPipe) id: string): Promise<boolean> {
    return await this.userService.deleteOne(id);
  }
}
