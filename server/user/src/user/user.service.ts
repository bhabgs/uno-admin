import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }
  // 查询用户
  async getUser() {
    return [];
  }
  // 添加用户
  async addUser() {
    return [];
  }
  // 删除用户
  async deleteUser() {
    return [];
  }
  // 更新用户
  async updateUser() {
    return [];
  }
}
