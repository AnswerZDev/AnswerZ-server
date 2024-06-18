import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { AuthMiddleware } from 'src/middleware/Auth.middleware';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [QuizService],
  exports: [QuizService],
  controllers: [QuizController],
})
export class QuizModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes('create-quiz');
  }
}
