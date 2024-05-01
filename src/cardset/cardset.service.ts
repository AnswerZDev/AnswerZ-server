import { Injectable, Req } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Cardset } from "src/entities/Cardset.entity";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";

@Injectable()
export class CardsetService {
    constructor(
        @InjectRepository(Cardset)
        private cardsetRepository: Repository<Cardset>
    ) {}

    async getMyPrivateCardsets(idUser: number): Promise<Cardset[]> { 
        
        const options = {
            where: {
                author: { id: idUser },
                visibility: 'Private'
            },
            order: {
                name: 'ASC'
            }
        } as FindOneOptions<Cardset>;

        const cardsets = await this.cardsetRepository.find(options);
        return cardsets;
    }

    async getCardsetById(id: number): Promise<Cardset> {
        return await this.cardsetRepository.findOne({ where: { id: id } } as FindOneOptions<Cardset>);
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
}

