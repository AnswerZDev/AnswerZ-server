import {Controller, Get, InternalServerErrorException, Req} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";

@ApiTags("User")
@ApiBearerAuth('access-token')
@Controller("user")
export class UsersController {
  constructor(
      private readonly userService: UsersService,
  ) {}

  @Get("me")
  currentUser(@Req() req) {
    try {
        const user = this.userService.findUserById(req.user.uid);
        return user;
    } catch (error) {
        throw new InternalServerErrorException("Error while getting user");
    }
  }
}
