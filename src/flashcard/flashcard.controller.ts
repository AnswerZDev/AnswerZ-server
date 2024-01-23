import { Body, Controller, Get, HttpException, HttpStatus, Param, Put } from "@nestjs/common";
import { Delete, Post } from "@nestjs/common/decorators";
import { ApiTags } from "@nestjs/swagger";
import { FlashcardService } from "../flashcard/flashcard.service";

@ApiTags("flashcard")
@Controller("flashcard")
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  @Get()
  async getAll() {
    try {
      const datas = await this.flashcardService.getAllFlashcards();
      return datas;
    } catch (error) {
      throw new HttpException('Error data not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() data: any) {
    try {
      const datas = await this.flashcardService.createOrUpdate(data);
      return datas;
    } catch (error) {
      throw new HttpException('Error creating flashcard', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Body() data: any, @Param('id') id: number) {
    try {
      const datas = await this.flashcardService.createOrUpdate(data, id);
      return datas;
    } catch (error) {
      throw new HttpException('Flashcard with ID ${id} not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const datas = await this.flashcardService.delete(id);
      return datas;
    } catch (error) {
      throw new HttpException('Flashcard with ID ${id} not found', HttpStatus.NOT_FOUND);
    }
  }
}
