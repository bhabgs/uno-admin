import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startNacos } from '@uno/nacos';
import {
  ErrExceptionsFilter,
  SuccessExceptions,
} from '@uno/nestjs-common-filter';

async function bootstrap() {
  const { port } = await startNacos('user');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('users');
  app.useGlobalFilters(new ErrExceptionsFilter());
  app.useGlobalInterceptors(new SuccessExceptions());

  await app.listen(port);
}
bootstrap();
