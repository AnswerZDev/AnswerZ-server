import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CardsetService } from "./cardset.service";

@ApiTags("cardset")
@Controller("cardset")
export class CardsetController {
  constructor(private cardsetService: CardsetService) {}

  @Get()
  async getAll() {
    try {
      const datas = await this.cardsetService.getAllCardsets();
      return datas;
    } catch (error) {
      throw new HttpException('Error data not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getCardsetById(@Param('id') id: number) {
    try {
      const datas = await this.cardsetService.getCardsetById(id);
      return datas;
    } catch (error) {
      throw new HttpException('Cardset with ID ${id} not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() data: any) {
    try {
      const datas = await this.cardsetService.createOrUpdate(data);
      return datas;
    } catch (error) {
      throw new HttpException('Error creating cardset', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(@Body() data: any, @Param('id') id: number) {
    try {
      if(id !== undefined && id !== null) {
        data.id = Number(id);
      }
      const datas = await this.cardsetService.createOrUpdate(data, id);
      return datas;
    } catch (error) {
      throw new HttpException('Cardset with ID ${id} not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const datas = await this.cardsetService.delete(id);
      return datas;
    } catch (error) {
      throw new HttpException('Cardset with ID ${id} not found', HttpStatus.BAD_REQUEST);
    }
  }
}
