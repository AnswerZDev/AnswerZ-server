import {Column, Entity} from "typeorm";

@Entity()
export class Quiz {
    @Column({name: "UserFirebaseId", primary: true, length: 255})
    private id: string;

    @Column({name: "quizPicture", length: 255, nullable: true})
    private quizPicture: string;

    @Column({name: "title", length: 255, nullable: true})
    private title: string;

    @Column({name: "description", length: 255, nullable: true})
    private description: string;

    @Column({name: "maxPlayers", length: 255, nullable: true})
    private maxPlayers: number;

    @Column({name: "visibility", length: 255, nullable: true})
    private visibility: string;

    @Column({name: "category", length: 255, nullable: true})
    private category: string;

}
