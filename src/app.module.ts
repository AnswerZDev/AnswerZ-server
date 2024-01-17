import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardsetModule } from "./cardset/cardset.module";
import { FlashcardModule } from "./flashcard/flashcard.module";
import { AccessControlModule } from "./access-control/access-control.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CardsetModule,
    FlashcardModule,
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
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
