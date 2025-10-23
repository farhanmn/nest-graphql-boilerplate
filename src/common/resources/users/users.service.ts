import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { prismaClient } from '../../../application/database';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput) {
    const user = await prismaClient.user.create({
      data: createUserInput
    });

    return UserMapper.toDto(user);
  }

  async findAll(name?: string) {
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

    return UserMapper.toDtoList(users);
  }

  async findOne(id: number) {
    const user = await prismaClient.user.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDto(user);
  }

  async findEmail(email: string) {
    const user = await prismaClient.user.findFirst({
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

    if (!user) {
      return null;
    }

    return UserMapper.toDtoWithPassword(user);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await prismaClient.user.update({
      data: updateUserInput,
      where: {
        id
      }
    });

    return UserMapper.toDto(user);
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
