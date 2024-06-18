import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags} from "@nestjs/swagger";
import { QuizService } from './quiz.service';
import {QuizDto} from "./dto/quiz.dto";

@ApiTags("Quiz endpoints")
@Controller('quiz')
export class QuizController {

    constructor(
        private readonly _quizService: QuizService
    ){}
    
    @Post('create-quiz')
    public createQuiz(@Body() quizDto: QuizDto): void {
        this._quizService.create(quizDto);
    }
}