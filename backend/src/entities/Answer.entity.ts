import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Flashcard } from "./Flashcard.entity";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn({ name: "AnswerId" })
  private id: number;

  @ManyToOne(() => Flashcard, "answers")
  @JoinColumn({ name: "FlashcardId", referencedColumnName: "id" })
  private flashcard: Flashcard;

  @Column({ name: "Question", length: 255 })
  private question: string;

  @Column({ name: "ResponseText", length: 255 })
  private responseText: string;

  constructor(answer: Partial<Answer>) {
    Object.assign(this, answer);
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getFlashcard(): Flashcard {
    return this.flashcard;
  }

  public setFlashcard(flashcard: Flashcard): void {
    this.flashcard = flashcard;
  }

  public getQuestion(): string {
    return this.question;
  }

  public setQuestion(question: string): void {
    this.question = question;
  }
}
