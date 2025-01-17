import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "../enums/role.enum";
import { BaseModel } from "@common/models/base.model";
import { Gender } from "@users/enums/gender.enum";
import { Address } from "@common/models/address.model";
import { AutoMap } from "@automapper/classes";
import { EmbeddedCampus } from "@campuses/models/embedded-campus.model";
import { Shop } from "./shop.model";

@Schema({ timestamps: true })
export class User extends BaseModel {
  @AutoMap()
  @Prop({ required: true, unique: true })
  username: string;

  @AutoMap()
  @Prop({ required: true })
  name: string;

  @AutoMap()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @AutoMap()
  @Prop({ type: Shop })
  shop: Shop;

  @AutoMap()
  @Prop()
  dob: string;

  @AutoMap()
  @Prop({ type: String, enum: Gender })
  gender: string;

  @AutoMap()
  @Prop({ type: String })
  phone: string;

  @AutoMap()
  @Prop({ type: String })
  profilePicture: string;

  @AutoMap()
  @Prop({ type: Address })
  address: Address;

  @AutoMap()
  @Prop({ type: EmbeddedCampus })
  campus: EmbeddedCampus;

  @AutoMap()
  @Prop({ type: [String], enum: Role, required: false })
  roles: string[];

  @AutoMap()
  @Prop({ type: Boolean })
  verified: boolean;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ "shop.name": 1 }, { unique: true, sparse: true });
UserSchema.index({ "shop.slug": 1 }, { unique: true, sparse: true });
