import { Address } from "@common/models/address.model";
import { AutoMap } from "@automapper/classes";

export class EmbeddedCampus {
  @AutoMap()
  id: string;

  @AutoMap()
  slug: string;

  @AutoMap()
  name: string;

  @AutoMap()
  address: Address;
}
