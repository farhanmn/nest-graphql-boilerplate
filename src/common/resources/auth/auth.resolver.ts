import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'register' })
  register(
    @Args('name', { type: () => String, nullable: true }) name: string,
    @Args('email', { type: () => String, nullable: true }) email: string,
    @Args('password', { type: () => String, nullable: true }) password: string
  ) {
    return this.authService.signUp({ name, email, password });
  }

  @Mutation(() => User, { name: 'login' })
  login(
    @Args('email', { type: () => String, nullable: true }) email: string,
    @Args('password', { type: () => String, nullable: true }) password: string
  ) {
    return this.authService.signIn({ email, password });
  }
}
