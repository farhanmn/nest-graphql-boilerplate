import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserWithTokenInput {
  @Field()
  userid: number;

  @Field()
  username: string;

  @Field()
  token: string;
}
