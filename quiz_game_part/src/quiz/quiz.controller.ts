import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpException, HttpStatus, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { diskStorage } from "multer";
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from "path";
import * as fs from "fs";
import {ApiBearerAuth} from "@nestjs/swagger";
import { QuizDto } from './quiz.dto';

@Controller('quiz')
export class QuizController {

    constructor(
    ){}
    
    @Post('create-quiz')
    public createQuiz(@Body() quizDto: QuizDto): void {
        
    }
}


