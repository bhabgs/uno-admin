import remote from '../remote';

// 查询菜单
export const getMenu = async () => {
  const res = await remote.get('/menu');
  if (res.data) {
    return res.data;
  }
  return [];
};
