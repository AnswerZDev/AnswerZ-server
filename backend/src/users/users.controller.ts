import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
