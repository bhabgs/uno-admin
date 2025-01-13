export * from '@uno/micro-utils';
// 生成随机页面id
export const generatePageId = () => {
  return Math.random().toString(36).slice(2);
};
