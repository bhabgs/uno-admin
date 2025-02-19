import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { startNacos } from '@uno/nacos';
import {
  ErrExceptionsFilter,
  SuccessExceptions,
} from '@uno/nestjs-common-filter';

async function bootstrap() {
  const file =
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development';
  dotenv.config({ path: file });
  console.log(process.env.PORT);
  await startNacos('users', Number(process.env.PORT));
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('users');
  app.useGlobalFilters(new ErrExceptionsFilter());
  app.useGlobalInterceptors(new SuccessExceptions());

  await app.listen(process.env.PORT);
}
bootstrap();
