import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cardset } from "./Cardset.entity";
import {Answer} from "./Answer.entity";

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn({ name: "FlashcardId" })
  private id: number;

  @ManyToOne(() => Cardset, "flashcards")
  @JoinColumn({ name: "CardSetId", referencedColumnName: "id" })
  private cardset: Cardset;

  @Column({ name: "Question", length: 255 })
  private question: string;

  @OneToMany(() => Answer, "flashcard")
  private answers: Answer[];

  constructor(flashcard: Partial<Flashcard>) {
    Object.assign(this, flashcard);
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getCardset(): Cardset {
    return this.cardset;
  }

  public setCardset(cardset: Cardset): void {
    this.cardset = cardset;
  }

  public getQuestion(): string {
    return this.question;
  }

  public setQuestion(question: string): void {
    this.question = question;
  }
}
