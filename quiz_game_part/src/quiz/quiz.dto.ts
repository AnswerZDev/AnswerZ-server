import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class QuizDto {
    @IsNotEmpty()
    @ApiProperty()
    readonly title: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly max_players: number;

    @IsNotEmpty()
    @ApiProperty()
    readonly visibility: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly category: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly image: string;
}
