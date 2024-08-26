import { AutoMap } from "@automapper/classes";
import { Address } from "@common/models/address.model";
import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Shop {
  @AutoMap()
  @Prop()
  slug: string;

  @AutoMap()
  @Prop()
  name: string;

  @AutoMap()
  @Prop()
  details: string;

  @AutoMap()
  @Prop({ type: Address })
  address: Address;
}
