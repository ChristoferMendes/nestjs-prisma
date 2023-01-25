import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

const include = {
  posts: true,
};

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.prisma.user.create({
      data: createUserDto,
    });

    return user;
  }

  findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      include,
    });
  }
}
