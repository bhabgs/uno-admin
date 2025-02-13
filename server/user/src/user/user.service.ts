import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorService } from '@uno/nestjs-common-filter';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // 引入 User 实体
import { Role } from 'src/role/role.entity';
import { CreateUser } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // 注入 UserRepository
    private readonly errorService: ErrorService,
  ) {}

  // 根据用户名查找用户
  findOneByUsername(username: string): Promise<User | undefined> {
    // username 有可能是手机号，也有可能是邮箱 返回数据要去掉密码

    return this.userRepository.findOne({
      where: [{ username: username }, { phone: username }, { email: username }],
      select: ['id', 'username', 'phone', 'email', 'role'],
    });
  }
  //

  // 创建用户
  async createUser(opt: CreateUser): Promise<User> {
    const { username, password, phone, email } = opt;
    // 先检查用户是否已存在
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      this.errorService.throwError('User already exists', 409);
    }

    // 使用 bcrypt 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建并保存新用户
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      phone,
      email,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  // 查找用户
  async findUserById(id: any): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'phone', 'email', 'nickname'],
    }); // 根据 ID 查找用户
  }

  // 查找所有用户
  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'username', 'phone', 'email', 'nickname'],
    }); // 查找所有用户
  }

  // 更新用户角色
  async updateUserRole(id: number, role: Role): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      this.errorService.throwError('User not found', 404);
    }
    user.role = role;
    return this.userRepository.save(user); // 保存更新后的用户
  }

  // 删除用户
  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    if (!user) {
      this.errorService.throwError('User not found', 404);
    }
    await this.userRepository.remove(user); // 删除用户
  }
}
