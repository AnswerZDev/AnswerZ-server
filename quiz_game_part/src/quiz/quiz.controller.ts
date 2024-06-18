import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpException, HttpStatus, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { diskStorage } from "multer";
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from "path";
import * as fs from "fs";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import { QuizDto } from './quiz.dto';
import { QuizService } from './quiz.service';

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