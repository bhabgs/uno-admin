import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService, // 注入 ConfigService
    private readonly jwtService: JwtService, // 注入 JwtService
    private readonly userService: UserService, // 注入 UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从 Authorization header 中提取 JWT
      secretOrKey: configService.get<string>('JWT_SECRET'), // 获取 secret 来验证 JWT
    });
  }

  // validate 方法会在每个请求中验证 JWT 的有效性
  async validate(payload: any): Promise<User> {
    // 根据 JWT payload 中的信息查找用户，这里假设 payload 有 userId 字段
    const user = await this.userService.findUserById(payload.userId); // 从数据库中查找用户

    if (!user) {
      throw new Error('User not found');
    }

    return user; // 返回用户，后续可以在请求中访问到 user 信息
  }
}
