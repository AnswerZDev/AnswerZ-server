import {Controller, Get, InternalServerErrorException, Req} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";

@ApiTags("User")
@Controller("user")
export class UsersController {
    constructor(
      private readonly userService: UsersService
    ) {}
    @ApiBearerAuth('access-token')
    @Get("me")
    async currentUser(@Req() req) {
    try {
        const user: any = await this.userService.findUserById(req.user.uid);
        if(!user) throw new InternalServerErrorException("Utilisateur introuvable");
        return user;
    } catch (error) {
        throw new InternalServerErrorException("Error while getting user");
    }
    }
}
