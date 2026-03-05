import {Injectable, InternalServerErrorException, NotFoundException, HttpException, HttpStatus} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, ILike, DeleteResult} from 'typeorm';
import {Post as PostEntity} from '../entities/post.entity';

@Injectable()
export class PostService {

  constructor(
      @InjectRepository(PostEntity)
      private postRepository: Repository<PostEntity>,
  ) {
  }

  async findAll(): Promise<PostEntity[]> {
    try {
      return await this.postRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error when fetching posts');
    }
  }

  async findById(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      where: {id}
    });

    if (!post) {
      throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async findAllByTitle(title: string): Promise<PostEntity[]> {
    try {
      return await this.postRepository.find({
        where: {title: ILike(`%${title}%`)}
      });
    } catch (error) {
      throw new InternalServerErrorException('Error when searching posts by title');
    }
  }

  async findRecent(limit: number = 10): Promise<PostEntity[]> {
    try {
      const maxLimit = 50;
      const finalLimit = Math.min(limit, maxLimit);

      return await this.postRepository.find({
        order: {id: 'DESC'},
        take: finalLimit
      });
    } catch (error) {
      throw new InternalServerErrorException('Error when fetching recent posts');
    }
  }

  async create(post: PostEntity): Promise<PostEntity> {
    try {
      post.title = post.title.trim();
      return await this.postRepository.save(post);
    } catch (error) {
      throw new InternalServerErrorException('Error when creating post');
    }
  }

  async update(post: PostEntity): Promise<PostEntity> {
    try {
      await this.findById(post.id);
      return await this.postRepository.save(post);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error when updating post');
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      await this.findById(id);
      return await this.postRepository.delete(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error when deleting post');
    }
  }
}
