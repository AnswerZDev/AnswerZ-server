import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./Question.entity";
import {User} from "./User.entity";

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn({name: "idQuiz"})
    private id: string;

    @Column({name: "quizPicture", length: 255, nullable: true})
    private quizPicture: string;

    @Column({name: "title", length: 255, nullable: true})
    private title: string;

    @Column({name: "description", length: 255, nullable: true})
    private description: string;

    @Column({name: "maxPlayers", nullable: true})
    private maxPlayers: number;

    @Column({name: "visibility", length: 255, nullable: true})
    private visibility: string;

    @Column({name: "category", length: 255, nullable: true})
    private category: string;

    @OneToMany(() => Question, "quiz")
    private questions: Question[];

    @ManyToOne(() => User, "quizs")
    @JoinColumn({ name: "authorId", referencedColumnName: "id" })
    private author: User;
}
