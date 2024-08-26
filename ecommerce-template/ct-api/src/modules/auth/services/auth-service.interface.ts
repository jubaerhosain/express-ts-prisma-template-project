import { LoginDto } from "@auth/dto/login.dto";
import { SignupDto } from "@auth/dto/signup.dto";

export interface IAuthService {
  signup(signupDto: SignupDto);
  login(loginDto: LoginDto);
}
