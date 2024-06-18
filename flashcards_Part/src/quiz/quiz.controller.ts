import {Body, Controller, Post, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {QuizService} from './quiz.service';
import {QuizDto} from "./dto/quiz.dto";
import {User} from "../entities/User.entity";
import {UsersService} from "../users/users.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from 'path';
import * as fs from 'fs';
import {Quiz} from "../entities/Quiz.entity";
import {Patch} from "@nestjs/common/decorators";

@ApiTags("Quiz endpoints")
@Controller('quiz')
export class QuizController {

    constructor(
        private readonly _quizService: QuizService,
        private readonly _userService: UsersService,
    ) {
    }

    @ApiBearerAuth('access-token')
    @Post('create-quiz')
    public async createQuiz(@Body() quizDto: QuizDto, @Req() req: any): Promise<Quiz> {
        let user: User = await this._userService.findUserById(req.user.uid);
        if (user) {
            quizDto.author = user;
            return await this._quizService.create(quizDto);
        }
    }

    @ApiBearerAuth('access-token')
    @Patch('upload-image-quiz/:idQuiz')
    @UseInterceptors(FileInterceptor('quizPicture', {
        storage: diskStorage({
            destination: (req: any, file, cb) => {
                // Vérifiez si req.user.uid est défini
                if (!req.user || !req.user.uid) {
                    return cb(new Error('User UID not found'), null);
                }
                const customPath = path.join('public/users', req.user.uid, 'quizs', req.params.idQuiz, 'quiz-picture');

                // Créez le dossier s'il n'existe pas
                fs.mkdirSync(customPath, {recursive: true});

                cb(null, customPath);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new Error("Only image files are allowed"), false);
            }
            callback(null, true);
        },
    }))
    async uploadProfilePhoto(@UploadedFile() photoProfile: Express.Multer.File, @Req() req: any) {
    }
}