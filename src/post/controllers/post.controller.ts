import {
  Controller,
  Get,
  Query
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
  findAll(@Query('page') page = 1, @Query('limit') limit = 10): Promise<PostEntity[]> {
    return this.postService.findAll({page, limit});
  }
}