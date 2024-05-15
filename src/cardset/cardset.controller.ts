import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CardsetService } from "./cardset.service";

@ApiTags("Cardset")
@Controller("Cardset")
export class CardsetController {
  constructor(private cardset_service: CardsetService) {}

  @Get()
  async getAll() {
    try {
      const datas = await this.cardset_service.getAllCardset();
      console.log(datas)
      return datas;
    } catch (error) {
      throw new HttpException('Error data not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/one')
  async getOne() {
    try {
      const datas = await this.cardset_service.getOneCardset(4);
      return datas;
    } catch (error) {
      throw new HttpException('Error data not found', HttpStatus.NOT_FOUND);
    }
  }



}
