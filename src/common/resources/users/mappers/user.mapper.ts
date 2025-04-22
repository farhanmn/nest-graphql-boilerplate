import { User as PrismaUser } from '@prisma/client';
import { User } from '../entities/user.entity';

export function toGraphQLUser(user: PrismaUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

export function toGraphQLUserList(users: PrismaUser[]): User[] {
  return users.map(toGraphQLUser);
}
