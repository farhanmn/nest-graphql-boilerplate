import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class JwtAuthExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown) {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();

      return new HttpException(message, status);
    }

    // Default: 500 Internal Server Error
    return new HttpException(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
