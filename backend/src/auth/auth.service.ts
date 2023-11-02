import { Injectable } from '@nestjs/common';
import { SignupUserDto } from '../dto/signup-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthService {
  signup(signUpDto: SignupUserDto) {
    return signUpDto;
  }

  login(loginDto: LoginUserDto) {
    return loginDto;
  }
}
