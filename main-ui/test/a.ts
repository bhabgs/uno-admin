import { makeAutoObservable, reaction } from 'mobx';
import { Menu } from './menu.dto';

class Menustore {
  constructor() {
    makeAutoObservable(this);
    this.init();
    reaction(() => this.openMenus, this.saveMenu);
  }
  init = () => {
    if (this.openMenus.length === 0) {
      this.openMenu(this.menus[0]);
      this.activeMenu = this.menus[0].path;
    }
  };
  activeMenu: string = '';
  menus: Menu[] = [];
  setActiceMenu = (menu: Menu) => {
    this.activeMenu = menu.path;
    console.log(this.activeMenu);
  };
  // 把每次菜单的打开记录下来（location）
  saveMenu = () => {
    localStorage.setItem(
      'menu',
      JSON.stringify({
        activeMenu: this.activeMenu,
        openMenus: this.openMenus,
      }),
    );
  };
  openMenus: Menu[] = [];
  openMenu = (menu: Menu) => {
    this.setActiceMenu(menu);
    // 不能重复打开
    if (this.openMenus.includes(menu)) {
      return;
    }

    this.openMenus.push(menu);
  };
  closeMenu = (menu: Menu) => {
    this.openMenus = this.openMenus.filter((item) => item !== menu);
  };
  getMenus = () => {
    return this.menus;
  };
}
const MenuStore = new Menustore();

export default MenuStore;
