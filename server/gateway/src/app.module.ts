import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from '@uno/redis';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
