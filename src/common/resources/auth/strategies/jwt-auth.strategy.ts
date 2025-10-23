import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret'
    });
  }

  validate(payload: { sub: string; email: string; role: string }) {
    if (!payload || !payload.sub) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid token',
          error: 'Unauthorized'
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
