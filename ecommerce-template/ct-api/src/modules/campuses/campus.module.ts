import { Module } from "@nestjs/common";
import { CampusService } from "./services/campus.service";
import { CampusController } from "./controllers/campus.controller";
import { CampusRepository } from "./repositories/campus.repository";
import { CampusProfile } from "./campus.profile";
import { Campus, CampusSchema } from "./models/campus.model";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: Campus.name, schema: CampusSchema }])],
  controllers: [CampusController],
  providers: [CampusService, CampusProfile, CampusRepository],
  exports: [CampusService],
})
export class CampusModule {}
