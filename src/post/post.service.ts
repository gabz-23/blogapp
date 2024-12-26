import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async createPost(post: CreatePostDto) {
    const newPost = this.postRepository.create(post);
    return await this.postRepository.save(newPost);
  }

  async findAllPost(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ['comments'] });
  }

  async findPostById(id: number): Promise<Post | HttpException> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      return new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post | HttpException> {
    const updatedPost = await this.postRepository.update(id, updatePostDto);

    if (updatedPost.affected === 0) {
      return new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    const postFound = await this.postRepository.findOne({ where: { id } });
    return postFound;
  }

  async deletePost(id: number): Promise<HttpException> {
    const deletedPost = await this.postRepository.delete(id);

    if (deletedPost.affected === 0) {
      return new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return new HttpException('Post deleted successfully', HttpStatus.OK);
  }
}
