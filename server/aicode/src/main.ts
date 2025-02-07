import { NestFactory } from '@nestjs/core';
// import { startNacos } from '@uno/nacos';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const { port } = await startNacos('aicode');
  await app.listen(8083);
}
bootstrap();
