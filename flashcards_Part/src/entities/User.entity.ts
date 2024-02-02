import { Column, Entity, OneToMany } from "typeorm";
import { Cardset } from "./Cardset.entity";
import { AccessControl } from "./AccessControl.entity";

@Entity()
export class User {
  @Column({ name: "UserFirebaseId", primary: true, length: 255 })
  private id: string;

  @OneToMany(() => Cardset, "author")
  private cardsets: Cardset[];

  @OneToMany(() => Cardset, "user")
  private accessControls: AccessControl[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

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
    return ["ROLE_USER"];
  }
}
