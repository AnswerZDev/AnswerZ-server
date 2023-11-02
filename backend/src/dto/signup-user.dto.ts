import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupUserDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
