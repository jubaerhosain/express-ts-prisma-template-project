import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserProfile } from "./user.profile";
import { User, UserSchema } from "./models/user.model";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserProfile, UserRepository],
  exports: [UserService],
})
export class UserModule {}
