import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/User.entity";
import {AuthMiddleware} from "../middleware/Auth.middleware";
import { Cardset } from "src/entities/Cardset.entity";
import { CardsetService } from "src/cardset/cardset.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Cardset])],
  controllers: [UsersController],
  providers: [UsersService, CardsetService],
  exports: [UsersService],
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .forRoutes('/user/me');
  }
}
