import remote from './remote';

// 查询菜单
export const getUser = async () => {
  const res = await remote.get('/user');
  if (res.data) {
    return res.data;
  }
  return [];
};
