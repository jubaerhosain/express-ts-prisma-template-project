import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "@common/models/base.model";
import { AutoMap } from "@automapper/classes";
import { Rating } from "./rating.model";
import { Discount } from "./discount.model";
import { ProductMeta } from "./product-meta.model";
import { Owner } from "./owner.model";

@Schema({ timestamps: true })
export class Product extends BaseModel {
  @AutoMap()
  @Prop({ type: String, required: true, unique: true })
  slug: string;

  @AutoMap()
  @Prop({ type: String, required: true })
  name: string;

  @AutoMap()
  @Prop({ type: Number, required: true })
  price: number;

  // virtual property, price after discount
  @AutoMap()
  finalPrice: number;

  @AutoMap()
  @Prop({ type: Number, required: true, default: 1 })
  stockCount: number;

  @AutoMap()
  @Prop({ enum: ["new", "used"], required: true })
  condition: string;

  // order: [..., grand parent, parent, child]
  @AutoMap()
  @Prop({ type: [String], required: true })
  categories: string[];

  @AutoMap()
  @Prop({ type: [String], required: true })
  images: string[];

  @AutoMap()
  @Prop({ type: ProductMeta })
  meta: ProductMeta;

  @AutoMap()
  @Prop({ type: String, required: true })
  details: string;

  @AutoMap()
  @Prop({ type: Owner, required: true })
  owner: Owner;

  @AutoMap()
  @Prop({ type: Discount })
  discount: Discount;

  @Prop({ type: [Rating] })
  ratings: Rating[];

  // virtual property
  @AutoMap()
  averageRating: number;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual("averageRating").get(function (this: ProductDocument) {
  if (!this.ratings || this.ratings.length === 0) {
    return 0;
  }
  const sum = this.ratings.reduce((acc, rating) => acc + rating.value, 0);
  return sum / this.ratings.length;
});

ProductSchema.virtual("finalPrice").get(function (this: ProductDocument) {
  const isDiscountValid = () => {
    const now = new Date(Date.now());
    const startAt = new Date(this.discount.startAt);
    const endAt = new Date(this.discount.endAt);
    return startAt <= now && now <= endAt;
  };

  if (!this.discount || !isDiscountValid()) {
    return this.price;
  }

  return this.price - this.price * (this.discount.percentage / 100);
});
