export * from './fullscreen';
// 路由跳转方法
export const routerTo = (url: string, title: string, params?: any) => {
  // 获取当前是否为微应用
  const isMicro = window.__MICRO_APP_ENVIRONMENT__;

  if (isMicro) {
    // 获取微应用名称
    const microName = window.__MICRO_APP_NAME__;
    window.microApp.forceDispatch({
      type: 'router',
      data: {
        url,
        title,
        params,
      },
    });
  }
};

// 当前是否是微应用环境
export const isMicro = () => window.__MICRO_APP_ENVIRONMENT__;

// 获取微应名称
export const getMicroName = () => window.__MICRO_APP_NAME__;

// 获取微应用主题
export const getMicroTheme = () => {
  // 如果是微应用
  if (isMicro()) {
    return window['rawWindow']['__MICRO_APP_THEME__'];
  }
  return window.__MICRO_APP_THEME__ || {};
};

// 设置微应用主题
export const setMicroTheme = (theme: Record<string, any>) => {
  window.__MICRO_APP_THEME__ = theme;
};
