import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const { authorEmail, ...restCreatePostDto } = createPostDto;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: authorEmail },
    });

    const data: Prisma.PostCreateInput = {
      ...restCreatePostDto,
      author: {
        connect: {
          email: user.email,
        },
      },
    };

    return this.prisma.post.create({
      data,
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUniqueOrThrow({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { authorEmail, ...restUpdatePostDto } = updatePostDto;

    if (!authorEmail) {
      return this.prisma.post.update({
        data: updatePostDto,
        where: { id },
        include: {
          author: true,
        },
      });
    }

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: authorEmail },
    });

    const data: Prisma.PostUpdateInput = {
      ...restUpdatePostDto,
      author: {
        connect: {
          email: user.email,
        },
      },
    };

    return this.prisma.post.update({
      where: { id },
      data,
      include: {
        author: true,
      },
    });
  }

  async remove(id: number) {
    const { id: userToDeleteId } = await this.prisma.post.findFirstOrThrow({
      where: { id },
    });

    return this.prisma.post.delete({
      where: { id: userToDeleteId },
      include: { author: true },
    });
  }
}
