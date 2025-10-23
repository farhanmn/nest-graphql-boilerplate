import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { create_token, verifyPassword } from '../../../utils/user';
import { UserWithTokenInput } from '../users/dto/user-with-token.input';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { hash } from '../../../utils/crypto';
import { UserMapper } from '../users/mappers/user.mapper';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(request: RegisterInput) {
    const user = await this.usersService.findEmail(request.email);

    if (user) {
      throw new Error('Email already exists');
    }

    const hashPassword = hash(request.password);
    const newUser = {
      ...request,
      password: hashPassword.pwd,
      salt: hashPassword.salt
    };

    return await this.usersService.create(newUser);
  }

  async signIn(request: LoginInput) {
    const user = await this.usersService.findEmail(request.email);

    if (!user) {
      throw new Error('Invalid email');
    }

    const verifyPass = verifyPassword(user, {
      email: request.email,
      password: request.password
    });

    if (!verifyPass) {
      throw new UnauthorizedException();
    }

    const token: UserWithTokenInput = create_token(verifyPass);

    return UserMapper.toDtoWithToken(token);
  }
}
