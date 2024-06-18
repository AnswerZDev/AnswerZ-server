import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Req} from "@nestjs/common";
import {QuestionService} from "./question.service";
import {QuestionDto} from "./dto/question.dto";
import {Question} from "../entities/Question.entity";
import {QuizService} from "../quiz/quiz.service";

@ApiTags("question")
@Controller("question")
export class QuestionController {
    constructor(
        private readonly _questionService: QuestionService,
        private readonly _quizService: QuizService
    ) {
    }

    @ApiBearerAuth('access-token')
    @Post('create-question/quiz/:idQuiz')
    async createQuestion(@Body() questionDto: QuestionDto, @Param('idQuiz') idQuiz: string): Promise<Question> {
        let quiz = await this._quizService.getQuizById(idQuiz);
        questionDto.quiz = quiz;
        return this._questionService.createQuestion(questionDto);
    }

    @Get('all-questions')
    async allQuestions(): Promise<Question[]> {
        return this._questionService.getAll();
    }

    @Delete('delete-question/:id')
    async deleteQuestion(@Param('id') id: number): Promise<void> {
        return this._questionService.deleteQuestion(id);
    }
}
