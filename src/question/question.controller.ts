import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {QuestionService} from "./question.service";
import {QuestionDto} from "./dto/question.dto";
import {Question} from "../entities/Question.entity";

@ApiTags("question")
@Controller("question")
export class QuestionController {
    constructor(
        private readonly _questionService: QuestionService,
    ) {
    }

    @Post('create-question')
    async createQuestion(@Body() questionDto: QuestionDto): Promise<Question> {
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
