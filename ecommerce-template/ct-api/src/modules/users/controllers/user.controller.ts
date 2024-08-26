import { Controller, Get, Post, Body, Param, Delete, Logger, HttpStatus, Put, Query } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserDto } from "../dto/user.dto";
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from "@nestjs/swagger";
import { UserQueryDto } from "../dto/user-query.dto";
import { PaginatedUserDto } from "../dto/paginated-user.dto";
import { UrlParameterPipe } from "src/pipes/url-parameter.pipe";
import { ResponseMessage } from "@decorators/response-message.decorator";

@ApiTags("users")
@ApiBearerAuth()
@Controller({
  path: "users",
  version: "1",
})
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserDto,
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ResponseMessage("User account created successfully", HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.createOne(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedUserDto,
  })
  async findAll(@Query() query: UserQueryDto): Promise<PaginatedUserDto> {
    return await this.userService.findAllPaginated(query);
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
  })
  async findOne(@Param("id", UrlParameterPipe) id: string): Promise<UserDto> {
    return this.userService.findOneById(id);
  }

  @Put(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  async update(@Param("id", UrlParameterPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.updateOne(id, updateUserDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ResponseMessage("User deleted successfully", HttpStatus.NO_CONTENT)
  async delete(@Param("id", UrlParameterPipe) id: string): Promise<boolean> {
    return await this.userService.deleteOne(id);
  }
}
