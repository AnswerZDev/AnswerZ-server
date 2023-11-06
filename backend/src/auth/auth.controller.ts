import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupUserDto } from "../dto/signup-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  signup(@Body() signUpDto: SignupUserDto) {
    return this.authService.signup(signUpDto);
  }

  @Post("login")
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }
}
