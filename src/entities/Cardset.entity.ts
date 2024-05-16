import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Flashcard } from "./Flashcard.entity";
import { AccessControl } from "./AccessControl.entity";

@Entity()
export class Cardset {
  @PrimaryGeneratedColumn({ name: "CardSetId" })
  public id: number;

  @ManyToOne(() => User, "cardsets")
  @JoinColumn({ name: "authorId", referencedColumnName: "id" })
  private author: User;

  @Column({ name: "Name", length: 255 })
  private name: string;

  @Column({ name: "Description", length: 255 })
  private description: string;

  @Column({ name: "Visibility", length: 255 })
  private visibility: string;

  @Column({ name: "Category", length: 255 })
  private category: string;

  @Column({ name: "NumberOfGoodAnswer" })
  private numberOfGoodAnswer: number;

  @Column({ name: "CreationDate" })
  private createdAt: Date;

  // @Column({ name: "Image" })
  // private image: string;

  @OneToMany(() => Flashcard, "cardset")
  public flashcards: Flashcard[];

  @OneToMany(() => Cardset, "cardSet")
  private accessControls: AccessControl[];

  constructor(cardset: Partial<Cardset>) {
    Object.assign(this, cardset);
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getVisibility(): string {
    return this.visibility;
  }

  public setVisibility(visibility: string): void {
    this.visibility = visibility;
  }

  public getNumberOfGoodAnswer(): number {
    return this.numberOfGoodAnswer;
  }

  public setNumberOfGoodAnswer(numberOfGoodAnswer: number): void {
    this.numberOfGoodAnswer = numberOfGoodAnswer;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getAuthor(): User {
    return this.author;
  }

  public setAuthor(author: User): void {
    this.author = author;
  }

  public getFlashcards(): Flashcard[] {
    return this.flashcards;
  }

  public setFlashcards(flashcards: Flashcard[]): void {
    this.flashcards = flashcards;
  }

  public getAccessControls(): AccessControl[] {
    return this.accessControls;
  }

  public setAccessControls(accessControls: AccessControl[]): void {
    this.accessControls = accessControls;
  }

  // public getImage(): string {
  //   return this.image;
  // }

  // public setImage(image: string): void {
  //   this.image = image;
  // }

  public getCategory(): string{
    return this.category;
  }

  public setCategory(new_category): void{
    this.category = new_category;
  }
}
