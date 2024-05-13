import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardsetController } from "./cardset/cardset.controller";
import { CardsetModule } from "./cardset/cardset.module";
import { FlashcardModule } from "./flashcard/flashcard.module";
import { FlashcardController } from "./flashcard/flashcard.controller";
import { AnswerModule } from "./answer/answer.module";
import { AnswerController } from "./answer/answer.controller";
import { AccessControlModule } from "./access-control/access-control.module";
import { AccessControlController } from "./access-control/access-control.controller";
import {SharedModule} from "./shared/shared.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CardsetModule,
    FlashcardModule,
    AnswerModule,
    AccessControlModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as unknown as any,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: parseInt(process.env.DATABASE_RETRY_ATTEMPTS),
    }),
    SharedModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Ajustez le chemin selon la structure de votre projet
      serveRoot: '/public/', // Chemin sous lequel les fichiers seront servis
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    CardsetController,
    FlashcardController,
    AnswerController,
    AccessControlController,
  ],
  providers: [AppService],
})
export class AppModule {}
