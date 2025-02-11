import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
  getHello(): string {
    return 'Hello World!';
  }
  // 查询用户
  async getRole() {
    return [];
  }
  // 添加用户
  async addRole() {
    return [];
  }
  // 删除用户
  async deleteRole() {
    return [];
  }
  // 更新用户
  async updateRole() {
    return [];
  }
}
