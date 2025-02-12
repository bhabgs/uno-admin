import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Role } from 'src/role/role.entity';
import { CreateUser } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUser): Promise<User> {
    console.log('创建用户', body);

    return this.userService.createUser(body);
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Get()
  async getAllUsers(@Query('name') name?: string): Promise<User[]> {
    console.log('查询所有用户', name);

    return this.userService.findAllUsers();
  }

  @Put(':id/role')
  async updateRole(
    @Param('id') id: number,
    @Body('role') role: Role,
  ): Promise<User> {
    return this.userService.updateUserRole(id, role);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
