import { Mapper } from "@automapper/core";
import { FilterQuery } from "mongoose";
import { Class } from "type-fest";

export class FindOneOptions<T> {
  filter?: FilterQuery<T>;
  relations?: string[] | any;
}

export class FindAllOptions<T> extends FindOneOptions<T> {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export enum DeletionType {
  SOFT = "SOFT",
  HARD = "HARD",
}

export class MapperOptions {
  mapper: Mapper;
  model: Class<any>;
  createDto: Class<any>;
  updateDto: Class<any>;
  responseDto: Class<any>;
}
