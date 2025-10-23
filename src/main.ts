import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { JwtAuthExceptionFilter } from './common/resources/auth/filters/jwt-auth.exception.filter';
import { GraphQLLoggingInterceptor } from './application/logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new GraphQLLoggingInterceptor());
  app.useGlobalFilters(new JwtAuthExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
