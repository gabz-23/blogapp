import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostService } from 'src/post/post.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private postService: PostService,
  ) {}

  async createComment(comment: CreateCommentDto) {
    const postFound = await this.postService.findPostById(comment.postId);

    if (!postFound) {
      return new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const newComment = this.commentRepository.create(comment);
    return await this.commentRepository.save(newComment);
  }

  async updateComment(id: number, comment: UpdateCommentDto) {
    const commentUpdated = await this.commentRepository.update(id, comment);

    if (commentUpdated.affected === 0)
      return new HttpException('Comment not found', HttpStatus.NOT_FOUND);

    const result = await this.commentRepository.findOne({
      where: { id },
    });

    return result;
  }

  async removeComment(id: number) {
    const remove = await this.commentRepository.delete(id);

    if (remove.affected === 0)
      return new HttpException('Comment not found', HttpStatus.NOT_FOUND);

    return new HttpException('Comment deleted successfully', HttpStatus.OK);
  }
}
