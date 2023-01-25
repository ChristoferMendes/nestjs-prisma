import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Content of the post ' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Email of the author' })
  @IsEmail()
  authorEmail: string;
}
