import { BaseCreateDto } from "@common/dto/base-create.dto";
import { BaseUpdateDto } from "@common/dto/base-update.dto";
import { BaseResponseDto } from "@common/dto/base-response.dto";
import { BaseModel } from "@common/models/base.model";
import { BasePaginatedResponseDto } from "@common/dto/base-paginated-response.dto";
import { PaginationMetaDto } from "@common/dto/pagination-meta.dto";
import { FindAllOptions } from "@common/types";
import { PartialDeep } from "type-fest";
import { BaseQueryDto } from "@common/dto/base-query.dto";

export interface IBaseService<
  TModel extends BaseModel,
  TCreateDto extends BaseCreateDto,
  TUpdateDto extends BaseUpdateDto,
  TResponseDto extends BaseResponseDto,
> {
  createOne(createDto: TCreateDto): Promise<TResponseDto>;
  createAll(createDto: TCreateDto[]): Promise<TResponseDto[]>;
  findOne(filter: PartialDeep<TModel>): Promise<TResponseDto>;
  findOneById(id: string): Promise<TResponseDto>;
  findAll(queryDto?: BaseQueryDto): Promise<TResponseDto[]>;
  findAllPaginated(queryDto: BaseQueryDto): Promise<BasePaginatedResponseDto>;
  paginate(options: FindAllOptions<TModel>): Promise<BasePaginatedResponseDto>;
  updateOne(id: string, updateDto: TUpdateDto): Promise<TResponseDto>;
  deleteOne(id: string): Promise<boolean>;
  softDeleteOne(id: string): Promise<boolean>;
  getPaginationMeta(params: { page?: number; limit?: number; itemCount: number }): Promise<PaginationMetaDto>;
}
