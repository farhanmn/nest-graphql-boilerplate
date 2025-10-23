import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'register' })
  register(@Args('registerParams') registerParams: RegisterDto) {
    return this.authService.signUp(registerParams);
  }

  @Mutation(() => User, { name: 'login' })
  login(@Args('loginParams') loginParams: LoginDto) {
    return this.authService.signIn(loginParams);
  }
}
