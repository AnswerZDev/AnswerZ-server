import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {QuestionTypeEnum} from "../enum/question-type.enum";

@Entity()
export class Question {
    @PrimaryGeneratedColumn({ name: "QuestionId" })
    private id: number;

    @Column({ name: "description", length: 255 })
    private description: string;

    @Column({ name: "duration", length: 255 })
    private duration: string;

    @Column({ name: "points" })
    private points: number;

    @Column({ name: "question_type", length: 255 })
    private question_type: QuestionTypeEnum;

    @Column({ name: "choices" })
    private choices: string;
}