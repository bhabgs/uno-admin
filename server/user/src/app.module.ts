import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { getNacosConfig } from '@uno/nacos';
import { UserModule } from './user/user.module';
import { RoleModel } from './role/role.module';
import { Role } from './role/role.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const config = await getNacosConfig({
          name: 'db.yml',
        });
        const { host, port, username, password, database } = config.mysql;
        return {
          type: 'mysql',
          host,
          port,
          username,
          password: password + '',
          database,
          entities: [User, Role],
          synchronize: true,
        };
      },
    }),
    UserModule,
    RoleModel,
    AuthModule,
  ],
})
export class AppModule {}
