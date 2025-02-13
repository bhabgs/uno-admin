import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startNacos } from '@uno/nacos';
import { AllExceptionsFilter } from '@uno/nestjs-common-errors';

async function bootstrap() {
  const { port } = await startNacos('user');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('users');
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
}
bootstrap();
