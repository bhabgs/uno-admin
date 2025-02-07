import { makeAutoObservable } from 'mobx';

class themeStore {
  colorPrimary = '#698fc6';
  borderRadius = 4;
  constructor() {
    makeAutoObservable(this);
  }
  // 设置主题色
  setThemeColor = (color: string) => {
    this.colorPrimary = color;
  };
}

const ThemeStore = new themeStore();
export default ThemeStore;
