import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // 创建角色
  @Post()
  async createRole(
    @Body('name') name: string,
    @Body('description') description: string,
  ): Promise<Role> {
    return this.roleService.createRole(name, description);
  }

  // 获取所有角色
  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.roleService.findAllRoles();
  }

  // 根据 ID 获取角色
  @Get(':id')
  async getRoleById(@Param('id') id: number): Promise<Role | undefined> {
    return this.roleService.findRoleById(id);
  }

  // 根据角色名获取角色
  @Get('name/:name')
  async getRoleByName(@Param('name') name: string): Promise<Role | undefined> {
    return this.roleService.findRoleByName(name);
  }

  // 更新角色
  @Put(':id')
  async updateRole(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
  ): Promise<Role> {
    return this.roleService.updateRole(id, name, description);
  }

  // 删除角色
  @Delete(':id')
  async deleteRole(@Param('id') id: number): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}
