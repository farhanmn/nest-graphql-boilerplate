import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from './user.dto';

@ObjectType()
export class UserWithToken extends OmitType(User, ['email'] as const) {
  @Field()
  token: string;
}
