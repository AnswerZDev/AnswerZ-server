import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CardsetService } from "./cardset.service";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("cardset")
@Controller("cardset")
export class CardsetController {
  constructor(private cardsetService: CardsetService) {}

  @ApiBearerAuth('access-token')
  @Get("private")
  async getMyPrivateCardsets(@Req() req) {
    try {
      const datas = await this.cardsetService.getMyCardsets(req.user.uid, 'Private');
      return datas;
    } catch (error) {
      throw new HttpException('Error fetching cardsets', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth('access-token')
  @Get('public')
  async getMyPublicCardsets(@Req() req) {
    try {
      const datas = await this.cardsetService.getMyCardsets(req.user.uid, 'Public');
      return datas;
    } catch (error) {
      throw new HttpException('Error fetching cardsets', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getCardsetById(@Param('id') id: number) {
    try {
      const datas = await this.cardsetService.getCardsetById(id);
      return datas;
    } catch (error) {
      throw new HttpException(`Cardset with ID ${id} not found`, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth('access-token')
  @Post()
  async create(@Body() data: any) {
    try {
      const datas = await this.cardsetService.createOrUpdate(data);
      return datas;
    } catch (error) {
      throw new HttpException('Error creating cardset', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth('access-token')
  @Patch(':id')
  async update(@Body() data: any, @Param('id') id: number) {
    try {
      if(id !== undefined && id !== null) {
        data.id = Number(id);
      }
      const datas = await this.cardsetService.createOrUpdate(data, id);
      return datas;
    } catch (error) {
      throw new HttpException(`Cardset with ID ${id} not found`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const datas = await this.cardsetService.delete(id);
      return datas;
    } catch (error) {
      throw new HttpException(`Cardset with ID ${id} not found`, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', { dest: '../../public' }))
  uploadImage(@UploadedFile() file) {
    try {
    } catch (error) {
      throw new HttpException(`Error with the image`, HttpStatus.BAD_REQUEST);
    }
  }
}
