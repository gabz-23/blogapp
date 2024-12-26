import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  title: string;

  @MinLength(5)
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsString()
  cover: string;

  @IsString()
  tags: string;
}
