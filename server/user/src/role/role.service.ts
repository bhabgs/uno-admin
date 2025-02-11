import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  // 创建角色
  async createRole(name: string, description: string): Promise<Role> {
    // 根据角色名称判断角色是否存在
    let role = await this.roleRepository.findOne({ where: { name } });
    if (role) {
      throw new Error('Role already exists');
    }
    role = this.roleRepository.create({ name, description });
    return this.roleRepository.save(role);
  }

  // 查找所有角色
  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  // 根据 ID 查找角色
  async findRoleById(id: number): Promise<Role | undefined> {
    return this.roleRepository.findOneBy({ id });
  }

  // 根据角色名查找角色
  async findRoleByName(name: string): Promise<Role | undefined> {
    return this.roleRepository.findOneBy({ name });
  }

  // 更新角色
  async updateRole(
    id: number,
    name: string,
    description: string,
  ): Promise<Role> {
    const role = await this.findRoleById(id);
    if (role) {
      role.name = name;
      role.description = description;
      return this.roleRepository.save(role);
    }
    throw new Error('Role not found');
  }

  // 删除角色
  async deleteRole(id: number): Promise<void> {
    const role = await this.findRoleById(id);
    if (role) {
      await this.roleRepository.remove(role);
    } else {
      throw new Error('Role not found');
    }
  }
}
