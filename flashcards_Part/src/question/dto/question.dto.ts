import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import {QuestionTypeEnum} from "../../enum/question-type.enum";

export class QuestionDto {
    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    duration: string;

    @ApiProperty()
    @IsNotEmpty()
    points: number;

    @ApiProperty()
    @IsNotEmpty()
    question_type: QuestionTypeEnum;

    @ApiProperty()
    @IsNotEmpty()
    choices: string;
}
