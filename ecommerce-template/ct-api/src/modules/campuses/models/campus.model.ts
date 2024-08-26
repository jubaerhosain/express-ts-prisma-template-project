import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "@common/models/base.model";
import { AutoMap } from "@automapper/classes";
import { Address } from "@common/models/address.model";

@Schema({ timestamps: true })
export class Campus extends BaseModel {
  @AutoMap()
  @Prop({ required: true, unique: true })
  slug: string;

  @AutoMap()
  @Prop({ required: true, unique: true })
  name: string;

  @AutoMap()
  @Prop({ type: Address })
  address: Address;
}

export type CampusDocument = HydratedDocument<Campus>;
export const CampusSchema = SchemaFactory.createForClass(Campus);
