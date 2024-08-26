import { BaseRepository } from "@common/repositories/base.repository";
import { ICampusRepository } from "./campus.repository.interface";
import { Campus } from "../models/campus.model";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CampusQueryDto } from "@campuses/dto/campus-query.dto";
import { SortOrder } from "@common/enums/sort-order.enum";

@Injectable()
export class CampusRepository extends BaseRepository<Campus> implements ICampusRepository<Campus> {
  constructor(@InjectModel(Campus.name) private readonly campusModel: Model<Campus>) {
    super(campusModel);
  }

  async isUniqueName(name: string): Promise<boolean> {
    const exist = await this.campusModel.exists({ name: new RegExp(`^${name}$`, "i") });
    return exist ? true : false;
  }

  override async findAll(queryDto: CampusQueryDto): Promise<Campus[]> {
    const { name, sortBy = "name", sortOrder = SortOrder.asc, ...paginationOptions } = queryDto;
    const filter: any = {};
    if (name) filter.name = new RegExp(name, "i");

    return await this.find({ ...paginationOptions, sortBy, sortOrder, filter });
  }
}
