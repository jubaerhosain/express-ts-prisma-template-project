import { Mapper, MappingProfile, createMap } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Campus } from "./models/campus.model";
import { CreateCampusDto } from "./dto/create-campus.dto";
import { CampusDto } from "./dto/campus.dto";
import { UpdateCampusDto } from "./dto/update-campus.dto";

@Injectable()
export class CampusProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateCampusDto, Campus);
      createMap(mapper, UpdateCampusDto, Campus);
      createMap(mapper, Campus, CampusDto);
    };
  }
}
