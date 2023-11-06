import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService],
})
export class AppModule {}
