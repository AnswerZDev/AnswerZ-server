import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cardset } from "../entities/Cardset.entity";
import { AuthMiddleware } from "src/middleware/Auth.middleware";
import { SharedModule } from "src/shared/shared.module";
import { User } from "src/entities/User.entity";
import {Question} from "../entities/Question.entity";
// import { UserCardsetLiked } from "src/entities/userCardsetLiked.entity";

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
