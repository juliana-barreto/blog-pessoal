import { Injectable, InternalServerErrorException, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Topic as TopicEntity } from "../entities/topic.entity";

@Injectable()
export class TopicService {

  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
  ) {
  }

  async findAll(): Promise<TopicEntity[]> {
    try {
      return await this.topicRepository.find();
    } catch (error) {
      throw new InternalServerErrorException("Error when fetching topics");
    }
  }

  async findById(id: number): Promise<TopicEntity> {
    const topic = await this.topicRepository.findOne({
      where: { id }
    });

    if (!topic) {
      throw new HttpException("Topic not found!", HttpStatus.NOT_FOUND);
    }

    return topic;
  }

  async findAllByDescription(description: string): Promise<TopicEntity[]> {
    try {
      return await this.topicRepository.find({
        where: { description: ILike(`%${description}%`) }
      });
    } catch (error) {
      throw new InternalServerErrorException("Error when searching topics by description");
    }
  }

  async create(topic: TopicEntity): Promise<TopicEntity> {
    try {
      topic.description = topic.description.trim();
      return await this.topicRepository.save(topic);
    } catch (error) {
      throw new InternalServerErrorException("Error when creating topic");
    }
  }

  async update(topic: TopicEntity): Promise<TopicEntity> {
    try {
      await this.findById(topic.id);
      return await this.topicRepository.save(topic);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException("Error when updating topic");
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      await this.findById(id);
      return await this.topicRepository.delete(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException("Error when deleting topic");
    }
  }
}

