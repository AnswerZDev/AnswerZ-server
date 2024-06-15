import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/User.entity";
import {AuthMiddleware} from "../middleware/Auth.middleware";
import {SharedModule} from "../shared/shared.module";
import { Cardset } from "src/entities/Cardset.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([
          User,
          Cardset
      ]),
      SharedModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .forRoutes(
            '/user/me',
            '/user/upload-photo'
        );
  }
}
