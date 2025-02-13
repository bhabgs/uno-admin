import { Injectable } from '@nestjs/common';
import { getNacosConfig } from '@uno/nacos';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis!: Redis;

  constructor() {
    this.init();
  }

  // redis 过期时间
  private seconds = 3600;

  init = async () => {
    const config = await getNacosConfig({
      name: 'db.yml',
    });
    const { port, host, seconds } = config.redis;

    if (seconds) {
      this.seconds = seconds;
    }

    // 配置 Redis 客户端
    this.redis = new Redis({
      host, // Redis 主机
      port, // Redis 端口
    });
  };

  // 保存 token 到 Redis
  async saveToken(userId: string, token: string): Promise<void> {
    await this.redis.set(userId, token, 'EX', this.seconds); // EX: 设置过期时间 (单位秒)
  }

  // 获取 Redis 中的 token
  async getToken(userId: string): Promise<string | null> {
    return await this.redis.get(userId);
  }

  // 删除 Redis 中的 token
  async removeToken(userId: string): Promise<void> {
    await this.redis.del(userId);
  }
}
