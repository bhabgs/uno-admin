// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module'; // 导入 UserModule
import { ErrorService } from '@uno/nestjs-common-filter';
import { RedisService } from '@uno/redis';

@Module({
  imports: [
    UserModule, // 导入 UserModule 以便可以使用 UserService
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, ErrorService, RedisService], // 提供 AuthService 和 JwtStrategy
  controllers: [AuthController],
})
export class AuthModule {}
