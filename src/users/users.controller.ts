import {Controller, Get, InternalServerErrorException, Req} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {FirebaseService} from "../shared/services/firebase.service";

@ApiTags("User")
@Controller("user")
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly _firebaseService: FirebaseService
    ) {
    }

    @ApiBearerAuth('access-token')
    @Get("me")
    async currentUser(@Req() req) {
        try {
            let user = await this.userService.findUserById(req.user.uid);
            let firebaseUser = await this._firebaseService.getUser(req.user.uid);

            return {
                ...user,
                ...firebaseUser
            }
        } catch (error) {
            throw new InternalServerErrorException("Error while getting user");
        }
    }
}
