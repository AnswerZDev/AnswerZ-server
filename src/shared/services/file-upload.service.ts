import { Injectable } from "@nestjs/common";
import {FileUploadConfig} from "../../config/file-upload.config";
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as multer from 'multer';
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class FileUploadService{

    private _fileUploadConfig: any = new FileUploadConfig().getConfig();

    private readonly storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const userId = req.body.userId; // Accédez directement à l'ID de l'utilisateur depuis req.body
            const dir = path.join('./public', userId.toString());
            fs.exists(dir, exist => {
                if (!exist) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                cb(null, dir);
            });
        },
        filename: (req, file, cb) => {
            const userId = req.body.userId;
            cb(null, `${userId}-${Date.now()}${path.extname(file.originalname)}`);
        }
    });

    private readonly upload = multer({ storage: this.storage });

    async uploadFile(file: Express.Multer.File): Promise<void> {
        this.upload.single(file.fieldname);
    }


}
