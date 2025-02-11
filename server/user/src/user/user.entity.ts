import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // 用户名
  @Column()
  username: string;

  // 邮箱
  @Column()
  email: string;

  // 密码
  @Column()
  password: string; // 密码会加密存储

  // 昵称
  @Column()
  nickname: string;
}
