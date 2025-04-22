import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { User as UserWithPass } from '../../models/user';
import { prismaClient } from '../../../application/database';
import { toGraphQLUser, toGraphQLUserList } from './mappers/user.mapper';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await prismaClient.user.create({
      data: createUserInput
    });

    return toGraphQLUser(user);
  }

  async findAll(name?: string): Promise<User[]> {
    const users = await prismaClient.user.findMany({
      where: {
        ...(name
          ? {
              name: {
                startsWith: `%${name}%`,
                mode: 'insensitive'
              }
            }
          : {})
      }
    });

    return toGraphQLUserList(users);
  }

  async findOne(id: number): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      return null;
    }

    return toGraphQLUser(user);
  }

  async findEmail(email: string): Promise<UserWithPass | null> {
    return prismaClient.user.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        salt: true
      }
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await prismaClient.user.update({
      data: updateUserInput,
      where: {
        id
      }
    });

    return toGraphQLUser(user);
  }

  async remove(id: number) {
    const user = await prismaClient.user.delete({
      where: {
        id
      }
    });

    if (!user) {
      return false;
    }

    return true;
  }
}
