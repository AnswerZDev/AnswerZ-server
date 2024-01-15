import { Module } from "@nestjs/common";
import { FlashcardController } from "./flashcard.controller";
import { FlashcardService } from "./flashcard.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Flashcard } from "../entities/Flashcard.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Flashcard])],
  controllers: [FlashcardController],
  providers: [FlashcardService],
})
export class FlashcardModule {}
