import { ConflictException, Injectable } from "@nestjs/common";
import { ICampusService } from "./campus.service.interface";
import { CampusRepository } from "../repositories/campus.repository";
import { Campus } from "../models/campus.model";
import { CampusDto } from "../dto/campus.dto";
import { CreateCampusDto } from "../dto/create-campus.dto";
import { UpdateCampusDto } from "../dto/update-campus.dto";
import { BaseService } from "@common/services/base.service";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CampusQueryDto } from "../dto/campus-query.dto";
import { PaginatedCampusDto } from "../dto/paginated-campus.dto";
import slugify from "slugify";

@Injectable()
export class CampusService
  extends BaseService<Campus, CreateCampusDto, UpdateCampusDto, CampusDto>
  implements ICampusService
{
  constructor(
    private readonly campusRepository: CampusRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(campusRepository, {
      mapper,
      model: Campus,
      createDto: CreateCampusDto,
      updateDto: UpdateCampusDto,
      responseDto: CampusDto,
    });
  }

  override async createOne(createDto: CreateCampusDto): Promise<CampusDto> {
    const exist = await this.isCampusExist(createDto.name);
    if (exist) throw new ConflictException({ email: "campus already exists" });

    const slug = slugify(createDto.name, { lower: true, strict: true });

    const campus = await this.campusRepository.saveOne({ ...createDto, slug });

    return this.mapper.map(campus, Campus, CampusDto);
  }

  override async findAllPaginated(queryDto: CampusQueryDto): Promise<PaginatedCampusDto> {
    const campuses = await this.campusRepository.findAll(queryDto);

    const { page, limit } = queryDto;
    const itemCount = campuses.length;

    return {
      items: this.mapper.mapArray(campuses, Campus, CampusDto),
      meta: await this.getPaginationMeta({ page, limit, itemCount }),
    };
  }

  async isCampusExist(name: string): Promise<boolean> {
    const exist = await this.campusRepository.isUniqueName(name);
    return exist ? true : false;
  }
}
