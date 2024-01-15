import { Injectable } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/User.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }
}
