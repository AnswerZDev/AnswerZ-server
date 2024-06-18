import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {User} from "../../entities/User.entity";

export class QuizDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly quizPicture: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly maxPlayers: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly visibility: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly category: string;

  @ApiProperty()
  author: User;
}
