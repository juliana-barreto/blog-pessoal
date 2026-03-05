import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { Topic } from './topic/entities/topic.entity';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_personalblog',
      entities: [Post, Topic],
      synchronize: true,
    }),
    PostModule,
    TopicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
