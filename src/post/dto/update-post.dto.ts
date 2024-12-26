import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  title?: string;

  @MinLength(5)
  @IsString()
  body?: string;

  @IsString()
  cover?: string;

  @IsString()
  tags?: string;
}
