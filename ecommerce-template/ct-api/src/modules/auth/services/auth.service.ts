import { Injectable } from "@nestjs/common";
import { IAuthService } from "./auth-service.interface";
import { SignupDto } from "@auth/dto/signup.dto";
import { LoginDto } from "@auth/dto/login.dto";
import { UserService } from "@users/services/user.service";

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly userService: UserService) {}

  signup(signupDto: SignupDto) {
    console.log(signupDto);
  }

  login(loginDto: LoginDto) {
    console.log(loginDto);
  }
}
