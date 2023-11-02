import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      firstname: 'Alexis',
      lastname: 'Carreau',
      email: 'alexis.carreau@gmail.com',
      password: 'alexis123',
    },
    {
      firstname: 'Théo',
      lastname: 'Dupin',
      email: 'theo.dupin@gmail.com',
      password: 'theo123',
    },
  ];

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }
}
