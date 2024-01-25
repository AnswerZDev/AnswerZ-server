import { Injectable } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/User.entity";
import {DeleteResult, FindOneOptions, Repository} from "typeorm";

@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async changeUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async deleteUser(idUser: string): Promise<void> {
        await this.userRepository.delete(idUser);
    }

    findUserById(idUser: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                id: idUser
            }
        } as FindOneOptions<User>);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
}
