import { IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { PaymentMethod } from "@orders/enums/payment-method.enum";
import { DeliveryStatus } from "@orders/enums/delivery-status.enum";

export class UpdateOrderDto {
  @AutoMap()
  @ApiProperty()
  @IsEnum(DeliveryStatus)
  @IsString()
  @IsOptional()
  deliveryStatus: string;

  @AutoMap()
  @ApiProperty()
  @IsEnum(PaymentMethod)
  @IsString()
  @IsOptional()
  paymentMethod: string;
}
