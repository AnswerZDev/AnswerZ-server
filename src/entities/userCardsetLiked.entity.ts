import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cardset } from "./Cardset.entity";
import { User } from "./User.entity";

@Entity('userCardsetLiked')
export class UserCardsetLiked {
  @PrimaryColumn({ name: 'cardset_id' })
  cardsetId: number;

  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Cardset)
  @JoinColumn([{ name: 'cardset_id', referencedColumnName: 'id' }])
  cardsets: Cardset[];

  @ManyToOne(() => User)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];
}