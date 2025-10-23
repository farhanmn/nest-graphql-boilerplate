import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/dto/user.dto';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'register' })
  register(@Args('registerParams') registerParams: RegisterInput) {
    return this.authService.signUp(registerParams);
  }

  @Mutation(() => User, { name: 'login' })
  login(@Args('loginParams') loginParams: LoginInput) {
    return this.authService.signIn(loginParams);
  }
}
