import { Mapper, MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Cart } from "./models/cart.model";
import { CreateCartDto } from "./dto/create-cart.dto";
import { CartDto } from "./dto/cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { ProductDto } from "@products/dto/product.dto";
import { Product } from "@products/models/product.model";

@Injectable()
export class CartProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateCartDto, Cart);
      createMap(mapper, UpdateCartDto, Cart);
      createMap(
        mapper,
        Cart,
        CartDto,
        forMember(
          (destination) => destination.items,
          mapFrom((source) => {
            const items = source.items?.map((item) => {
              const { quantity, product } = item;

              if (!product || typeof product === "string") return { quantity, product };

              const mappedProduct = mapper.map<Product, ProductDto>(product, Product, ProductDto);
              return { quantity, product: mappedProduct };
            });
            return items;
          }),
        ),
      );
    };
  }
}
