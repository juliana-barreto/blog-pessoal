import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { Post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService],
  controllers: [PostController],
  exports:[],
})
export class PostModule {}
