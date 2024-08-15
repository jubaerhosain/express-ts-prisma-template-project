import { Module } from "@nestjs/common";
import { JwtStrategy } from "../../strategies/jwt.strategy";
import { UserModule } from "@users/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./services/auth.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow("JWT_SECRET"),
        signOptions: { expiresIn: "6000s" },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
