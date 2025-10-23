import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [UsersService, AuthService, AuthResolver, JwtStrategy],
  exports: [JwtModule, JwtStrategy]
})
export class AuthModule {}
