import { Injectable } from '@nestjs/common';
import {QuizDto} from "./dto/quiz.dto";
import {Quiz} from "../entities/Quiz.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class QuizService {

    public constructor(
        @InjectRepository(Quiz)
        private readonly _quizRepository: Repository<Quiz>
    ) {}
    

    public async create(quizDto: QuizDto): Promise<Quiz> {
        return await this._quizRepository.save(quizDto);
    }
}
