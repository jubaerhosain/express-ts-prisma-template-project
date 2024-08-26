import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "@common/models/base.model";
import { AutoMap } from "@automapper/classes";
import { ObjectId } from "@database/types/object-id.type";

@Schema({ timestamps: true })
export class Category extends BaseModel {
  @AutoMap()
  @Prop({ required: true, unique: true })
  name: string;

  @AutoMap()
  @Prop({ type: Number })
  productCount: number;

  @AutoMap()
  @Prop({ type: ObjectId, ref: "Category" })
  parent: string | Category;
}

export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
