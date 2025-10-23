import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.dto';
import { IsOptional } from 'class-validator';

@ObjectType()
export class UserWithPassword extends User {
  @Field()
  @IsOptional()
  password: string | null;

  @Field()
  @IsOptional()
  salt: string | null;
}
