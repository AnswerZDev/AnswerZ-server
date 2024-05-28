import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/User.entity";
import {FindOneOptions, FindOptionsWhere, Repository} from "typeorm";
import {Cardset} from "../entities/Cardset.entity";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Cardset)
        private readonly _cardSetRepository: Repository<Cardset>,
    ) {
    }

    async createUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async changeUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async deleteUser(idUser: string): Promise<void> {
        await this.userRepository.delete(idUser);
    }

    async findUserById(idUser: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                id: idUser
            }
        } as FindOneOptions<User>);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUrlProfilePicture(idUser: string, photoName: string): Promise<string> {
        // return the url of server where the photo is stored. Dynamicly generate the url. With the url server
        // the client can download the photo
        return `http://localhost:3000/public/users/${idUser}/photo-profile/${photoName}`;
    }

    async getNumberOfFlashcards(idUser: string): Promise<number> {
        const cardSetOfUser = await this._cardSetRepository.find({
            where: {
                author: {
                    id: idUser
                }
            } as FindOptionsWhere<Cardset>
        });

        // count the number of flashcards of the user
        let numberOfFlashcards = 0;
        for (const cardSet of cardSetOfUser) {
            numberOfFlashcards += cardSet.flashcards !== undefined ? cardSet.flashcards.length : 0;
        }

        return numberOfFlashcards;
    }
}
