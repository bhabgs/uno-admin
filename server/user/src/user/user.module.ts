import { Module } from '@nestjs/common';
import { ErrorService } from '@uno/nestjs-common-filter';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, ErrorService],
  exports: [UserService],
})
export class UserModule {}
