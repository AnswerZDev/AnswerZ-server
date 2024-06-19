import { Module } from "@nestjs/common";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";

@Module({
  imports: [QuizController],
  providers: [QuizService],
  exports: [QuizService]
})
export class QuizModule {}
