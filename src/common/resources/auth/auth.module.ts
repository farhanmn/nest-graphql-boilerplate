import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';

@Module({
  imports: [JwtModule],
  providers: [UsersService, AuthService, AuthResolver]
})
export class AuthModule {}
