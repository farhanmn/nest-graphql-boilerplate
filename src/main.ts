import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLLoggingInterceptor } from './application/logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // dev
  app.useGlobalInterceptors(new GraphQLLoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
