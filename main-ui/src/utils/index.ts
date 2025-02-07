export * from '@uno/micro-utils';
// 生成随机页面id
export const generatePageId = () => {
  return Math.random().toString(36).slice(2);
};

// 截流
export const throttle = (fn: Function, delay: number) => {
  let timer: any = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
};

// 防抖
export const debounce = (fn: Function, delay: number) => {
  let timer: any = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};
