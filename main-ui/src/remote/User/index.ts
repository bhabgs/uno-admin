import remote from '../remote';
import { USER, USERCreate, USERLogin } from './user.dto';

// 创建用户
export const createUser = async (data: USERCreate) => {
  return remote.post('/users', data);
};

// 登录
export const login = async (data: USERLogin) => {
  return remote.post<USER>('/users/auth/login', data);
};

// 查询所有用户
export const getUsers = async () => {
  return remote.get('/users');
};
