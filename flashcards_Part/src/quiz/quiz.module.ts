import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {QuizController} from './quiz.controller';
import {QuizService} from './quiz.service';
import {AuthMiddleware} from 'src/middleware/Auth.middleware';
import {SharedModule} from 'src/shared/shared.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/User.entity";
import {Cardset} from "../entities/Cardset.entity";
import {Quiz} from "../entities/Quiz.entity";
import {UsersService} from "../users/users.service";

@Module({
    imports: [
        SharedModule,
        TypeOrmModule.forFeature([
            Quiz,
            User,
            Cardset
        ]),
    ],
    providers: [
        QuizService,
        UsersService
    ],
    exports: [QuizService],
    controllers: [QuizController],
})
export class QuizModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes('/quiz/create-quiz');
    }
}
