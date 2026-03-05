import {Transform, TransformFnParams} from "class-transformer";
import {IsNotEmpty} from "class-validator";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Topic} from "../../topic/entities/topic.entity";

@Entity({name: "tb_posts"})
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({length: 100, nullable: false})
  title: string;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({length: 1000, nullable: false})
  text: string;

  @UpdateDateColumn()
  date: Date;

  @ManyToOne(() => Topic, (topic) => topic.posts, {onDelete: "CASCADE"})
  topic: Topic;
}