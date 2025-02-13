import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // 引入 UserService
import { JwtPayload } from './dto/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { ErrorService } from '@uno/nestjs-common-filter';
import { RedisService } from '@uno/redis';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, // 引入 JwtService
    private readonly errorService: ErrorService,
    private readonly redisService: RedisService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // username 有可能是手机号，也有可能是邮箱
    const user = await this.userService.findOneByUsername(username);

    if (user && !(await bcrypt.compare(pass, user.password))) {
      this.errorService.throwError('密码错误', 401);
    }

    if (user && (await bcrypt.compare(pass, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    // 生成 JWT token
    const access_token = this.jwtService.sign(payload);
    // 存储到 Redis
    await this.redisService.saveToken(user.id, access_token);
    return {
      access_token,
      info: user,
    };
  }
}
