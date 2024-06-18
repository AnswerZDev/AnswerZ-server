import {Body, Controller, Post, Req} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {QuizService} from './quiz.service';
import {QuizDto} from "./dto/quiz.dto";
import {User} from "../entities/User.entity";
import {UsersService} from "../users/users.service";

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
    public async createQuiz(@Body() quizDto: QuizDto, @Req() req: any): Promise<void> {
        console.log(quizDto);
        let user: User = await this._userService.findUserById(req.user.uid);
        if (user) {
            quizDto.author = user;
            this._quizService.create(quizDto);
        }
    }
}