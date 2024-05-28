import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CardsetController } from "./cardset.controller";
import { CardsetService } from "./cardset.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cardset } from "../entities/Cardset.entity";
import { AuthMiddleware } from "src/middleware/Auth.middleware";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [TypeOrmModule.forFeature([Cardset]), SharedModule],
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
