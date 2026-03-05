import {Transform, TransformFnParams} from "class-transformer";
import {IsNotEmpty, Length} from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../../post/entities/post.entity";

@Entity({name: "tb_topics"})
export class Topic {

  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty({message: "Description is required."})
  @Length(10, 1000, {message: "Description must be between 10 and 1000 characters"})
  @Column({length: 1000, nullable: false})
  description: string;

  @OneToMany(() => Post, (post) => post.topic)
  posts: Post[];
}

