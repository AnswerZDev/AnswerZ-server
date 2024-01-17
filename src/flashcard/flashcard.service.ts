import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Flashcard } from "src/entities/Flashcard.entity";
import { Repository } from "typeorm";

@Injectable()
export class FlashcardService {
    constructor(
        @InjectRepository(Flashcard)
        private flashcardRepository: Repository<Flashcard>
    ) {}

    getAllFlashcards(): Promise<Flashcard[]> {
        return this.flashcardRepository.find();
    }

    async createOrUpdate(data: any, id?: number): Promise<any> {
        if(id !== undefined && data.id !== id) {
            data.id = Number(id);
        }
        const datas = await this.flashcardRepository.save(data);
        return datas;
    }
}
