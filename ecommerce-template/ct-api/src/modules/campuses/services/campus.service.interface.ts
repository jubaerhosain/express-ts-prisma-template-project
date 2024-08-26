import { IBaseService } from "@common/services/base.service.interface";
import { CreateCampusDto } from "../dto/create-campus.dto";
import { UpdateCampusDto } from "../dto/update-campus.dto";
import { CampusDto } from "../dto/campus.dto";
import { Campus } from "../models/campus.model";

export interface ICampusService extends IBaseService<Campus, CreateCampusDto, UpdateCampusDto, CampusDto> {
  isCampusExist(name: string): Promise<boolean>;
}
