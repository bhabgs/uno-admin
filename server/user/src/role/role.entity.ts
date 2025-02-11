import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 角色名称

  @Column()
  description: string; // 角色描述

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
