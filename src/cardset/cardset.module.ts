import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CardsetController } from "./cardset.controller";
import { CardsetService } from "./cardset.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cardset } from "../entities/Cardset.entity";
import { AuthMiddleware } from "src/middleware/Auth.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([Cardset])],
  controllers: [CardsetController],
  providers: [CardsetService],
})
export class CardsetModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //       .apply(AuthMiddleware)
  //       .forRoutes('/cardset');
  // }
}
