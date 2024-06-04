import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany} from "typeorm";
import {Cardset} from "./Cardset.entity";
import {AccessControl} from "./AccessControl.entity";
import {Role} from "../enum/role.enum";

@Entity()
export class User {
    @Column({name: "UserFirebaseId", primary: true, length: 255})
    private id: string;

    @OneToMany(() => Cardset, "author")
    private cardsets: Cardset[];

    @OneToMany(() => Cardset, "user")
    private accessControls: AccessControl[];

    @Column({name: 'photo', length: 255, nullable: true})
    private profilePicture: string;

    @ManyToMany(() => Cardset)
    @JoinTable(
        {
            name: 'userCardsetLiked',
            joinColumn: {
              name: 'user_id',
              referencedColumnName: 'id',
            },
            inverseJoinColumn: {
              name: 'cardset_id',
              referencedColumnName: 'id',
            },
        }
    )
    public cardsetsLiked: Cardset[];

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getCardsets(): Cardset[] {
        return this.cardsets;
    }

    public setCardsets(cardsets: Cardset[]): void {
        this.cardsets = cardsets;
    }

    public getAccessControls(): AccessControl[] {
        return this.accessControls;
    }

    public setAccessControls(accessControls: AccessControl[]): void {
        this.accessControls = accessControls;
    }

    public getRoles(): string[] {
        return [Role.USER];
    }

    public getProfilePicture(): string {
        return this.profilePicture;
    }

    public setProfilePicture(profilePicture: string): void {
        this.profilePicture = profilePicture;
    }

    // public getCardsetsLiked(): Cardset[]{
    //     return this.cardsetsLiked;
    // }

    // public setCardsetsLiked(cardsets: Cardset[]): void{
    //     this.cardsetsLiked = cardsets;
    // }
}
