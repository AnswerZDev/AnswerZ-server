import { Module } from "@nestjs/common";
import { CardsetController } from "./cardset.controller";
import { CardsetService } from "./cardset.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cardset } from "../entities/Cardset.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cardset])],
  controllers: [CardsetController],
  providers: [CardsetService],
})
export class CardsetModule {}
