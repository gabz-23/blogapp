import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @MaxLength(255)
  body: string;

  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
