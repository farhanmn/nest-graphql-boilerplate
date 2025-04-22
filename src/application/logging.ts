import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
import { GraphQLResolveInfo } from 'graphql/type';
import { logger } from '../utils/logger';

@Injectable()
export class GraphQLLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const info: GraphQLResolveInfo = gqlContext.getInfo();
    const args: GraphQLResolveInfo = gqlContext.getArgs();

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        const operation = info.operation.operation;
        const fieldName = info.fieldName;

        // logger every hit graphQL
        logger.info(
          `GraphQL ${operation} -> ${fieldName}, args: ${JSON.stringify(args)}, response-time: ${duration}ms`
        );
      })
    );
  }
}
