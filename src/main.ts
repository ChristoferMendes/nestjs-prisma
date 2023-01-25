import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './shared/errors/interceptors/conflict.interceptor';
import { DatabaseInterceptor } from './shared/errors/interceptors/database.interceptor';
import { NotFoundInterceptor } from './shared/errors/interceptors/notFound.interceptor';
import { UnauthorizedInterceptor } from './shared/errors/interceptors/unauthorized.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const interceptors = [
    new NotFoundInterceptor(),
    new ConflictInterceptor(),
    new DatabaseInterceptor(),
    new UnauthorizedInterceptor(),
  ];

  app.useGlobalInterceptors(...interceptors);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
