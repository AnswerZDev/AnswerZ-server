import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CardsetController } from "./cardset.controller";
import { CardsetService } from "./cardset.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cardset } from "../entities/Cardset.entity";
import { AuthMiddleware } from "src/middleware/Auth.middleware";
import { SharedModule } from "src/shared/shared.module";
import { User } from "src/entities/User.entity";
// import { UserCardsetLiked } from "src/entities/userCardsetLiked.entity";

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      Cardset,
      // UserCardsetLiked
    ]), SharedModule],
  controllers: [CardsetController],
  providers: [CardsetService],
})
export class CardsetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/cardset');
  }
}
