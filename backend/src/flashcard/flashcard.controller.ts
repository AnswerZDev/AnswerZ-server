import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Flashcard")
@Controller("Flashcard")
export class FlashcardController {
  constructor() {}
}
