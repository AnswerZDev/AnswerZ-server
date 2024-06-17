import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { QuizDto } from './quiz.dto';

@Injectable()
export class QuizService {

    public constructor() {}
    

    public create(quizDto: QuizDto): void {

    }
}
