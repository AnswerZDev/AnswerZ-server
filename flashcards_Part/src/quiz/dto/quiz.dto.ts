import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {User} from "../../entities/User.entity";

export class QuizDto {
  @ApiProperty()
  readonly quizPicture: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly maxPlayers: number;

  @ApiProperty()
  readonly visibility: string;

  @ApiProperty()
  readonly category: string;

  @ApiProperty()
  author: User;
}
