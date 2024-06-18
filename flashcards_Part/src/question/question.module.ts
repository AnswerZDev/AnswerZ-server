import {Module} from "@nestjs/common";
import {QuestionController} from "./question.controller";
import {QuestionService} from "./question.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SharedModule} from "src/shared/shared.module";
import {Question} from "../entities/Question.entity";
import {QuizService} from "../quiz/quiz.service";
import {Quiz} from "../entities/Quiz.entity";
import {QuizModule} from "../quiz/quiz.module";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                Question,
                Quiz
            ]
        ),
        SharedModule,
        QuizModule
    ],
    controllers: [QuestionController],
    providers: [QuestionService],
})
export class QuestionModule {
}
