import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './common/resources/users/users.module';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './common/resources/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/api',
      sortSchema: true,
      playground: true
    }),
    UsersModule,
    AuthModule
    // other modules
  ]
})
export class AppModule {}
