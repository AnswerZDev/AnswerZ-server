import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Flashcard } from "src/entities/Flashcard.entity";
import { DeleteResult, FindOneOptions, Repository } from "typeorm";

@Injectable()
export class FlashcardService {
    constructor(
        @InjectRepository(Flashcard)
        private flashcardRepository: Repository<Flashcard>
    ) {}

    async getAllFlashcards(): Promise<Flashcard[]> {
        return await this.flashcardRepository.find();
    }

    async getFlashcardById(id: number): Promise<Flashcard> {
        return await this.flashcardRepository.findOne({ where: { id: id } } as FindOneOptions<Flashcard>);
    }

    async createOrUpdate(data: any, id?: number): Promise<any> {
        const datas = await this.flashcardRepository.save(data);
        return datas;
    }

    async delete(id: number): Promise<DeleteResult>{
        if (id !== undefined && id !== null) {
            const datas = await this.flashcardRepository.delete(id);
            return datas;
        }
    }
}
