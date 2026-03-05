import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post as PostMethod,
  Put
} from "@nestjs/common";
import {Topic as TopicEntity} from "../entities/topic.entity";
import {TopicService} from "../services/topic.service";

@Controller("/topics")
export class TopicController {

  constructor(
      private readonly topicService: TopicService
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<TopicEntity[]> {
    return this.topicService.findAll();
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  findById(@Param("id", ParseIntPipe) id: number): Promise<TopicEntity> {
    return this.topicService.findById(id);
  }

  @Get("/description/:description")
  @HttpCode(HttpStatus.OK)
  findAllByDescription(@Param("description") description: string): Promise<TopicEntity[]> {
    return this.topicService.findAllByDescription(description);
  }

  @PostMethod()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() topic: TopicEntity): Promise<TopicEntity> {
    return this.topicService.create(topic);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() topic: TopicEntity): Promise<TopicEntity> {
    return this.topicService.update(topic);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.topicService.delete(id);
  }
}

