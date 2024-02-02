import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Cardset } from "./Cardset.entity";

@Entity()
export class AccessControl {
  @PrimaryGeneratedColumn({ name: "AccessControlId" })
  private id: number;

  @ManyToOne(() => User, "accessControls")
  @JoinColumn({ name: "UserId", referencedColumnName: "id" })
  private user: User;

  @ManyToOne(() => Cardset, "accessControls")
  @JoinColumn({ name: "CardSetId", referencedColumnName: "id" })
  private cardSet: Cardset;

  constructor(accessControl: Partial<AccessControl>) {
    Object.assign(this, accessControl);
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public getCardSet(): Cardset {
    return this.cardSet;
  }

  public setCardSet(cardSet: Cardset): void {
    this.cardSet = cardSet;
  }
}
