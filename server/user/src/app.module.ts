import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { getNacosConfig } from '@uno/nacos';
import { UserModel } from './user/user.module';
import { RoleModel } from './role/role.module';

@Module({
  imports: [
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
          entities: [User],
          synchronize: true,
        };
      },
    }),
    UserModel,
    RoleModel,
  ],
})
export class AppModule {}
