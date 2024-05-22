import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CardsetService } from "./cardset.service";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import * as fs from "fs";
import { diskStorage } from "multer";
import { Cardset } from "src/entities/Cardset.entity";


@ApiTags("cardset")
@Controller("cardset")
export class CardsetController {
  constructor(
    private readonly cardsetService: CardsetService
  ) {}

  @ApiBearerAuth("access-token")
  @Get("private")
  async getMyPrivateCardsets(@Req() req) {
    try {
      const datas = await this.cardsetService.getMyCardsets(
        req.user.uid,
        "Private"
      );
      const datasWithImageUrl = datas.map(data => ({
        ...data,
        image: data.getImage() === null
          ? null
          : `http://localhost:3000/users/${req.user.uid}/image/cardset/${data.getId()}/${data.getImage()}`
      }));
      return datasWithImageUrl;
    } catch (error) {
      throw new HttpException(
        "Error fetching cardsets",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @ApiBearerAuth("access-token")
  @Get("public")
  async getMyPublicCardsets(@Req() req) {
    try {
      const datas = await this.cardsetService.getMyCardsets(
        req.user.uid,
        "Public"
      );
      return datas;
    } catch (error) {
      throw new HttpException(
        "Error fetching cardsets",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async getCardsetById(@Param("id") id: number, @Req() req){
    try {
      const datas = await this.cardsetService.getCardsetById(id);
      const imageUrl = datas.getImage() ? `http://localhost:3000/users/${req.user.uid}/image/cardset/${datas.getId()}/${datas.getImage()}` : null;
      const updatedDatas = {
        ...datas,
        image: imageUrl
      };
      return updatedDatas;
    } catch (error) {
      throw new HttpException(
        `Cardset with ID ${id} not found`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @ApiBearerAuth("access-token")
  @Post()
  async create(@UploadedFile() file: Express.Multer.File, @Req() req, @Body() data) {
    try {
      data.author = req.user.uid;
      if (file) {
        data.image = file.filename;
      }
      const datas = await this.cardsetService.createOrUpdate(data);
      return datas;
    } catch (error) {
      console.dir(error)
      throw new HttpException("Error creating cardset", HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth("access-token")
  @Patch(":id")
  async update(@Body() data: any, @Param("id") id: number) {
    try {
      if (id !== undefined && id !== null) {
        data.id = Number(id);
      }
      const datas = await this.cardsetService.createOrUpdate(data, id);
      return datas;
    } catch (error) {
      throw new HttpException(
        `Cardset with ID ${id} not found`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    try {
      const datas = await this.cardsetService.delete(id);
      return datas;
    } catch (error) {
      throw new HttpException(
        `Cardset with ID ${id} not found`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @ApiBearerAuth("access-token")
  @Patch("upload-image-cardset/:id")
  @UseInterceptors(
    FileInterceptor("imageCardset", {
      storage: diskStorage({
        destination: (req: any, file, cb) => {
          // Vérifiez si req.user.uid est défini
          if (!req.user || !req.user.uid) {
            return cb(new Error("User UID not found"), null);
          }

          const cardsetId = req.params.id;
          const customPath = path.join(
            "./public/users",
            req.user.uid,
            `image/cardset/${cardsetId}`
          );

          // Créez le dossier s'il n'existe pas
          fs.mkdirSync(customPath, { recursive: true });

          cb(null, customPath);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
          return callback(new Error("Only image files are allowed"), false);
        }
        file.originalname = file.originalname;
        callback(null, true);
      },
    })
  )
  async uploadImageCardset(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Param("id") id: number
  ) {

    let cardset: Cardset = await this.cardsetService.getCardsetById(id);
    if (!cardset) {
      throw new InternalServerErrorException("Cardset not found");
    }


    if(file) {
      const customPath = path.join(
        "./public/users",
        req.user.uid,
        `image/cardset/${id}`
      );

      // Supprime l'ancienne image si elle existe
      if(cardset.getImage() !== null) {
        const existingImagePath = path.join(customPath, cardset.getImage());
        if (fs.existsSync(existingImagePath)) {
          fs.unlinkSync(existingImagePath);
        }
      }

      cardset.setImage(file.originalname);
    }

    await this.cardsetService.createOrUpdate(cardset);
  }
}
