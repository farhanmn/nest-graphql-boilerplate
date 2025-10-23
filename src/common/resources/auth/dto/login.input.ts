import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @MinLength(6)
  password: string;
}
