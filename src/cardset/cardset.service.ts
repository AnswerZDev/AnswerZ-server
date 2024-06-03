import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { FindManyOptions, FindOneOptions, Not, Repository } from "typeorm";
import { identity } from "rxjs";
import { Cardset } from "src/entities/Cardset.entity";
import { User } from "src/entities/User.entity";
import { UserCardsetLiked } from "src/entities/userCardsetLiked.entity";
import { isDataURI } from "class-validator";

@Injectable()
export class CardsetService {
    constructor(
        @InjectRepository(Cardset)
        private cardsetRepository: Repository<Cardset>,
        @InjectRepository(UserCardsetLiked)
        private userCardsetLikedRepository: Repository<UserCardsetLiked>
    ) {}

    async getMyCardsets(idUser: number, visibility?: string): Promise<Cardset[]> {
        const options = {
            where: {
                author: { id: idUser },
                visibility: visibility
            },
            order: {
                name: 'ASC'
            }
        } as FindOneOptions<Cardset>;

        const cardsets = await this.cardsetRepository.find(options);
        return cardsets;
    }

    async getCardsetById(id: number): Promise<Cardset> {
        return await this.cardsetRepository.findOne({ 
            where: { id: id },
            relations: {
                flashcards: true
            }
        } as FindOneOptions<Cardset>);
    }

    async createOrUpdate(data: any, id?: number): Promise<any> {
        const datas = await this.cardsetRepository.save(data);
        return datas;
    }

    async delete(id: number): Promise<any>{
        if (id !== undefined && id !== null) {
            const datas = await this.cardsetRepository.delete(id);
            return datas;
        }
    }

    async getAllCardsetPublic(idUser: number) : Promise<Cardset[]> {
        const options = {
            where: {
                author: { id: Not(idUser) },
                visibility: 'Public'
            },
            relations: {
                flashcards: true,
            }
        } as FindOneOptions<Cardset>;

        const cardsets = await this.cardsetRepository.find(options);
        return cardsets;
    }

    async getOneCardset(my_id: number) : Promise<Cardset | null> {
        return await this.cardsetRepository.findOne({where: {id: my_id}, 
            relations: {
                flashcards: true,
            }, });
    }

    async getCardsetPublicLiked(idUser: string) : Promise<any>{

        // const query = this.userCardsetLikedRepository.createQueryBuilder('userCardsetLiked')
        //         .where('userCardsetLiked.userId = :id', {id : idUser});

        const userCardsetLikedRecords = await this.cardsetRepository.find({
            relations: {
                usersLiked: true,
            },
        });

        console.log(userCardsetLikedRecords);

        return userCardsetLikedRecords;
        // return await query.getMany();
    
        // const cardsets = await this.userCardsetLikedRepository.find(
        //     {
        //         where: {
        //             cardsetId: 1
        //         }
        //     }
        // );
        // return cardsets;
        // const options = {
        //     where: {
        //         author: { id: idUser },
        //         visibility: 'Public'
        //     },
        //     relations: {
        //         usersLiked: true,
        //     }
        // } as FindOneOptions<Cardset>;

        // const cardsets = await this.cardsetRepository.find(options);
        // return cardsets;
        // return await this.cardsetRepository.findOne({
        //     where: {
        //         id: 1,
        //     }, 
        //     relations: {
        //         flashcards : true
        //     }, 
        // });
        // const query = this.cardsetRepository
        //     .createQueryBuilder('cardset')
        //     .innerJoin('cardset.usersLiked', 'userCardsetLiked')
        //     .where('userCardsetLiked.user_id = :idUser', { idUser })
        //     .getMany()

        // return query;

        // return await this.cardsetRepository.find({where: {id: idUser}, 
        //     relations: {
        //         flashcards: true,
        //     }, });
    }
}
