import { makeAutoObservable } from 'mobx';

class themeStore {
  colorPrimary = '#698fc6';
  borderRadius = 4;
  constructor() {
    makeAutoObservable(this);
  }
  headerBackground = 'rgb(76 156 233)';
  // 设置头部背景色
  setHeaderBackground = (color: string) => {
    this.headerBackground = color;
  };
  // 设置主题色
  setThemeColor = (color: string) => {
    this.colorPrimary = color;
  };
}

const ThemeStore = new themeStore();
export default ThemeStore;
