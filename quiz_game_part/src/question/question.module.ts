import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "src/shared/shared.module";
import {Question} from "../entities/Question.entity";

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      Question,
      // UserCardsetLiked
    ]), SharedModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {
}
