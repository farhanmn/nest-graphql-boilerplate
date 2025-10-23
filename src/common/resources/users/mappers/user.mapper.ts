import { User as PrismaUser } from '@prisma/client';
import { User } from '../dto/user.dto';
import { UserWithPassword } from '../dto/user-with-password.dto';
import { UserWithToken } from '../dto/user-with-token.dto';
import { UserWithTokenInput } from '../dto/user-with-token.input';

export class UserMapper {
  static toDto(user: PrismaUser): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  static toDtoWithPassword(user: PrismaUser): UserWithPassword {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      salt: user.salt
    };
  }

  static toDtoWithToken(user: UserWithTokenInput): UserWithToken {
    return {
      id: user.userid,
      name: user.username,
      token: user.token
    };
  }

  static toDtoList(users: PrismaUser[]): User[] {
    return users.map((user) => this.toDto(user));
  }
}
