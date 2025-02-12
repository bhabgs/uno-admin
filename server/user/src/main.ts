import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startNacos } from '@uno/nacos';

async function bootstrap() {
  const { port } = await startNacos('user');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('users');
  await app.listen(port);
}
bootstrap();
