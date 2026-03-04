import { Controller, Get } from "@nestjs/common";
import { PostService } from "../services/post.service";
import { Post } from "../entities/post.entity";


@Controller("/posts")
export class PostController{

    constructor(
        private readonly postService: PostService
      ){}

    @Get()
    findAll(): Promise<Post[]>{
        return this.postService.findAll();
    }
}