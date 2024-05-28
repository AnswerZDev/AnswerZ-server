import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cardset } from "./Cardset.entity";

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn({ name: "FlashcardId" })
  private id: number;

  @ManyToOne(() => Cardset, "flashcards", { onDelete: 'CASCADE' })
  @JoinColumn({ name: "CardSetId", referencedColumnName: "id" })
  private cardset: Cardset;

  @Column({ name: "Question", length: 255 })
  private question: string;

  @Column({ name: "Answer", length: 255 })
  private answer: string;

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

  public getAnswer(): string {
    return this.answer;
  }

  public setAnswer(answer: string): void {
    this.answer = answer;
  }
}
