import { Mapper } from "@automapper/core";
import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { BaseModel } from "../models/base.model";
import { BaseCreateDto } from "../dto/base-create.dto";
import { BaseUpdateDto } from "../dto/base-update.dto";
import { BaseResponseDto } from "../dto/base-response.dto";
import { IBaseService } from "./base.service.interface";
import { IBaseRepository } from "../repositories/base.repository.interface";
import { PartialDeep } from "type-fest";
import { BasePaginatedResponseDto } from "../dto/base-paginated-response.dto";
import { PaginationMetaDto } from "../dto/pagination-meta.dto";
import { DeletionType, MapperOptions } from "@common/types";
import { BaseQueryDto } from "@common/dto/base-query.dto";

export abstract class BaseService<
  TModel extends BaseModel,
  TCreateDto extends BaseCreateDto,
  TUpdateDto extends BaseUpdateDto,
  TResponseDto extends BaseResponseDto,
> implements IBaseService<TModel, TCreateDto, TUpdateDto, TResponseDto>
{
  private _mapper: Mapper;
  private _model: any;
  private _createDto: any;
  private _updateDto: any;
  private _responseDto: any;

  constructor(
    private readonly _repository: IBaseRepository<TModel>,
    private readonly _mapperHelper: MapperOptions,
  ) {
    this._mapper = this._mapperHelper.mapper;
    this._model = this._mapperHelper.model;
    this._createDto = this._mapperHelper.createDto;
    this._updateDto = this._mapperHelper.updateDto;
    this._responseDto = this._mapperHelper.responseDto;
  }

  async createOne(createDto: TCreateDto): Promise<TResponseDto> {
    const data = await this._repository.saveOne(createDto as PartialDeep<TModel>);
    const mappedData = this._mapper.map<TModel, TResponseDto>(data, this._model, this._responseDto);
    return mappedData;
  }

  async createAll(createDto: TCreateDto[]): Promise<TResponseDto[]> {
    const list = await this._repository.saveAll(createDto as any[]);
    const mappedList = this._mapper.mapArray<TModel, TResponseDto>(list, this._model, this._responseDto);
    return mappedList;
  }

  async findOne(filter: PartialDeep<TModel>): Promise<TResponseDto> {
    const data = await this._repository.findOne({ filter });
    const mappedData = this._mapper.map<TModel, TResponseDto>(data, this._model, this._responseDto);
    return mappedData;
  }

  async findOneById(id: string): Promise<TResponseDto> {
    const data = await this._repository.findOneById(id);
    if (!data) throw new NotFoundException("NOT FOUND");
    const mappedData = this._mapper.map<TModel, TResponseDto>(data, this._model, this._responseDto);
    return mappedData;
  }

  async findAll(queryDto?: BaseQueryDto): Promise<TResponseDto[]> {
    const list = await this._repository.findAll(queryDto);
    const mappedList = this._mapper.mapArray<TModel, TResponseDto>(list, this._model, this._responseDto);
    return mappedList;
  }

  async findAllPaginated(queryDto: BaseQueryDto): Promise<BasePaginatedResponseDto> {
    return this.paginate(queryDto);
  }

  async paginate(options: BaseQueryDto): Promise<BasePaginatedResponseDto> {
    const list = await this._repository.findAll(options);
    const mappedList = this._mapper.mapArray<TModel, TResponseDto>(list, this._model, this._responseDto);

    const { page, limit } = options;
    const itemCount = list.length;

    const meta = await this.getPaginationMeta({ page, limit, itemCount });

    const paginatedData = {
      meta,
      items: mappedList,
    };

    return paginatedData;
  }

  async updateOne(id: string, updateDto: TUpdateDto): Promise<TResponseDto> {
    const updated = await this._repository.updateOne(id, updateDto as PartialDeep<TModel>);

    if (!updated) throw new HttpException("Update failed", HttpStatus.INTERNAL_SERVER_ERROR);

    const data = await this._repository.findOneById(id);

    const mappedData = this._mapper.map<TModel, TResponseDto>(data, this._model, this._responseDto);
    return mappedData;
  }

  async deleteOne(id: string): Promise<boolean> {
    const deleted = await this._repository.deleteOne(id);
    if (!deleted) throw new NotFoundException("NOT FOUND");
    return deleted;
  }

  async softDeleteOne(id: string): Promise<boolean> {
    const deleted = await this._repository.deleteOne(id, DeletionType.SOFT);
    if (!deleted) throw new NotFoundException("NOT FOUND");
    return deleted;
  }

  async getPaginationMeta(params: { page?: number; limit?: number; itemCount: number }): Promise<PaginationMetaDto> {
    const { page, limit, itemCount } = params;

    let totalItemCount = itemCount;
    if (page && limit) totalItemCount = await this._repository.countTotalItem();

    let actualLimit = totalItemCount;
    if (page && limit) actualLimit = Math.min(totalItemCount, limit);

    return {
      itemCount,
      totalItemCount: totalItemCount,
      currentPage: page ?? 1,
      totalPageCount: actualLimit > 0 ? Math.ceil(totalItemCount / actualLimit) : 1,
      itemPerPage: actualLimit,
    };
  }
}
