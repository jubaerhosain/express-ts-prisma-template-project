import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@database/database.module";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { UserModule } from "@users/user.module";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ProductModule } from "@products/product.module";
import { CategoryModule } from "@categories/category.module";
import { CartModule } from "@carts/cart.module";
import { OrderModule } from "@orders/order.module";
import { AuthModule } from "@auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    UserModule,
    ProductModule,
    CategoryModule,
    CartModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
