import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

interface GraphQLContext {
  req: Request;
}

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  override getRequest(context: ExecutionContext): Request {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext<GraphQLContext>();
    return ctx.req;
  }
}
