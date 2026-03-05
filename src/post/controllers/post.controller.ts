import {
  Controller,
  Get,
  Post as PostMethod,
  Put,
  Delete,
  Query,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe
} from "@nestjs/common";
import {PostService} from "../services/post.service";
import {Post as PostEntity} from "../entities/post.entity";


@Controller("/posts")
export class PostController {

  constructor(
      private readonly postService: PostService
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get('recent')
  @HttpCode(HttpStatus.OK)
  findRecent(@Query('limit') limit: number = 10) {
    return this.postService.findRecent(limit);
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  findById(@Param("id", ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.findById(id);
  }

  @Get("/title/:title")
  @HttpCode(HttpStatus.OK)
  findAllByTitle(@Param("title") title: string): Promise<PostEntity[]> {
    return this.postService.findAllByTitle(title);
  }

  @PostMethod()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.update(post);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}