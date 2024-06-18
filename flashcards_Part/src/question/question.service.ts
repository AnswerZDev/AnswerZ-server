import {Body, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {QuestionDto} from "./dto/question.dto";
import {Question} from "../entities/Question.entity";

@Injectable()
export class QuestionService {
    public constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
    ) {
    }

    public createQuestion(questionDto: QuestionDto): Promise<Question> {
        return this.questionRepository.save(questionDto);
    }

    public getAll(): Promise<Question[]> {
        return this.questionRepository.find();
    }

    public deleteQuestion(id: number): void {
        this.questionRepository.delete(id).then();
    }
}
