import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TopicController } from "./controllers/topic.controller";
import { Topic } from "./entities/topic.entity";
import { TopicService } from "./services/topic.service";

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [TopicService],
  controllers: [TopicController],
  exports: [],
})
export class TopicModule {}

