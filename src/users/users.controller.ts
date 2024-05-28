import {
    Controller,
    Get,
    InternalServerErrorException,
    Patch, Post,
    Req,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {FirebaseService} from "../shared/services/firebase.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from "path";
import * as fs from "fs";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entities/User.entity";

@ApiTags("User")
@Controller("user")
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly _firebaseService: FirebaseService,
    ) {
    }

    @ApiBearerAuth('access-token')
    @Get("me")
    async currentUser(@Req() req: any) {
        try {
            // Get user from database
            let user: any = await this.userService.findUserById(req.user.uid);

            // set the url of the profile picture
            user.profilePicture = await this.userService.getUrlProfilePicture(user.id, user.profilePicture);

            // set the number of flashcards of the user
            user.numberOfFlashcards = await this.userService.getNumberOfFlashcards(user.id);

            // Get user from firebase
            let firebaseUser = await this._firebaseService.getUser(req.user.uid);

            return {
                ...user,
                ...firebaseUser
            }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("Error while getting user");
        }
    }

    @ApiBearerAuth('access-token')
    @Post('upload-photo')
    @UseInterceptors(FileInterceptor('photoProfile', {
        storage: diskStorage({
            destination: (req: any, file, cb) => {
                // Vérifiez si req.user.uid est défini
                if (!req.user ||!req.user.uid) {
                    return cb(new Error('User UID not found'), null);
                }
                const customPath = path.join('./public/users', req.user.uid, 'photo-profile');

                // Créez le dossier s'il n'existe pas
                fs.mkdirSync(customPath, { recursive: true });

                cb(null, customPath);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new Error("Only image files are allowed"), false);
            }
            file.originalname = `profilePicture.${file.originalname.split('.')[1]}`;
            callback(null, true);
        },
    }))
    async uploadProfilePhoto(@UploadedFile() photoProfile: Express.Multer.File, @Req() req: any) {
        let user: User = await this.userService.findUserById(req.user.uid);
        if(!user) {
            throw new InternalServerErrorException("User not found");
        }

        user.setProfilePicture(photoProfile.originalname);
        await this.userService.changeUser(user);
    }
}
