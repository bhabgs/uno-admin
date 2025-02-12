import { Role } from 'src/role/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // 用户名
  @Column()
  username: string;

  // 邮箱
  @Column({ default: '' })
  email: string;

  // 手机号
  @Column({ default: '' })
  phone: string;

  // 密码
  @Column()
  password: string; // 密码会加密存储

  // 昵称
  @Column({
    default: '',
  })
  nickname: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role; // 外键关联到角色表
}
