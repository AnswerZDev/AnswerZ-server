import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Cardset")
@Controller("Cardset")
export class CardsetController {
  constructor() {}
}
