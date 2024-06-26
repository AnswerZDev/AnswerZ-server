import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardsetModule} from "./cardset/cardset.module";
import {FlashcardModule} from "./flashcard/flashcard.module";
import {AccessControlModule} from "./access-control/access-control.module";
import {SharedModule} from "./shared/shared.module";
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {Cardset} from "./entities/Cardset.entity";
import {Flashcard} from "./entities/Flashcard.entity";
import {AccessControl} from "./entities/AccessControl.entity";
import {User} from "./entities/User.entity";
import {Question} from "./entities/Question.entity";
import {QuestionModule} from "./question/question.module";

@Module({
    imports: [
        UsersModule,
        AuthModule,
        CardsetModule,
        FlashcardModule,
        AccessControlModule,
        QuestionModule,
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
            entities: [Cardset, Flashcard, User, AccessControl, Question],
            synchronize: true,
        }),
        SharedModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'), // Ajustez le chemin selon la structure de votre projet
            serveRoot: '/public/', // Chemin sous lequel les fichiers seront servis
        }),
    ],
    controllers: [
        AppController,
    ],
    providers: [AppService],
})
export class AppModule {
}
