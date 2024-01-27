import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
        return await this.carSetRepository.find();
    }

}
