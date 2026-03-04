import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity} from '../entities/post.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async findAll(p: { page: number; limit: number }): Promise<PostEntity[]> {
    try {
      return this.postRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error when fetching posts')
    }
  }
}
