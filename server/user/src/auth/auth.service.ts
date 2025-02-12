import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // 引入 UserService
import { JwtPayload } from './dto/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, // 引入 JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // 查找用户
    const user = await this.userService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      //@ts-ignore
      const { ...result } = user;
      return result; // 返回不包含密码的用户信息
    }
    return null;
  }

  async login(user: any) {
    // 创建JWT载荷
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
