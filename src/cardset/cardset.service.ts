import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { identity } from "rxjs";
import { Cardset } from "src/entities/Cardset.entity";
import { Repository } from "typeorm";

@Injectable()
export class CardsetService {

    constructor(
        @InjectRepository(Cardset)
        private carSetRepository: Repository<Cardset>
    ){

    }

    async getAllCardset() : Promise<Cardset[]> {
        return await this.carSetRepository.find(
            {
                relations : {
                    flashcards: true
                }
            }
        );
    }

    async getOneCardset(my_id: number) : Promise<Cardset | null> {
        return await this.carSetRepository.findOne({where: {id: my_id}, 
            relations: {
                flashcards: true,
            }, });
    }


}
