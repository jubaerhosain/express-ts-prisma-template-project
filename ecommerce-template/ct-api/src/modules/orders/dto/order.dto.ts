import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "@common/dto/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { OrderItemDto } from "./order-item.dto";
import { Address } from "@common/models/address.model";
import { UserDto } from "@users/dto/user.dto";

export class OrderDto extends BaseResponseDto {
  @AutoMap()
  @ApiProperty({ required: false })
  user: UserDto;

  @AutoMap()
  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[];

  @AutoMap()
  @ApiProperty()
  totalPrice: number;

  @AutoMap()
  @ApiProperty({ type: Address })
  deliveryAddress: Address;

  @AutoMap()
  @ApiProperty()
  deliveryStatus: string;

  @AutoMap()
  @ApiProperty()
  paymentMethod: string;
}
