import remote from './remote';

// 创建用户
export const createUser = async (data: {
  username: string;
  password: string;
  email?: string;
  phone?: string;
}) => {
  return remote.post('/users', data);
};

// 登录
export const login = async (data: { username: string; password: string }) => {
  return remote.post('/users/auth/login', data);
};

// 查询所有用户
export const getUsers = async () => {
  return remote.get('/users');
};
