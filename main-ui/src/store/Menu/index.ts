import { makeAutoObservable, reaction } from 'mobx';
import { Menu } from './menu.dto';

class Menustore {
  constructor() {
    makeAutoObservable(this);
    this.init();
  }
  init = () => {
    if (this.openMenus.length === 0) {
      this.openMenu(this.menus[0]);
      this.activeMenu = this.menus[0].path;
    }
    this.restoreMenu();
    reaction(
      () => [this.openMenus, this.activeMenu],
      () => {
        this.saveMenu();
      },
    );
  };
  activeMenu: string = '';
  menus: Menu[] = [
    {
      name: '首页',
      id: '1',
      path: '/home',
    },
    {
      name: '订单管理',
      id: '2',
      path: '/order',
      children: [
        {
          name: '订单列表',
          path: '/order/list',
          id: '2-1',
        },
        {
          name: '订单详情',
          path: '/order/detail',
          id: '2-2',
        },
      ],
    },
    {
      name: '商品管理',
      id: '3',
      path: '/product',
      children: [
        {
          name: '商品列表',
          path: '/product/list',
          id: '3-1',
        },
        {
          name: '商品详情',
          path: '/product/detail',
          id: '3-2',
        },
      ],
    },
    {
      name: '用户管理',
      id: '4',
      path: '/user',
      children: [
        {
          name: '用户列表',
          path: '/user/list',
          id: '4-1',
        },
        {
          name: '用户详情',
          path: '/user/detail',
          id: '4-2',
        },
      ],
    },
  ];
  setActiceMenu = (menu: Menu) => {
    this.activeMenu = menu.path;
    console.log(this.activeMenu);
  };
  // 把每次菜单的打开记录下来（location）
  saveMenu = () => {
    sessionStorage.setItem(
      'menu',
      JSON.stringify({
        activeMenu: this.activeMenu,
        openMenus: this.openMenus,
      }),
    );
  };
  // 初始时恢复关闭前的状态
  restoreMenu = () => {
    const menu = sessionStorage.getItem('menu');
    if (menu) {
      const { activeMenu, openMenus } = JSON.parse(menu);
      this.setActiceMenu(this.getItemByPath(activeMenu)!);
      this.openMenus = openMenus;
    }
  };
  openMenus: Menu[] = [];
  openMenu = (menu: Menu) => {
    this.setActiceMenu(menu);
    // 不能重复打开根据path
    if (this.openMenus.findIndex((item) => item.path === menu.path) !== -1) {
      return;
    }
    this.openMenus.push(menu);
  };
  closeMenu = (menu: Menu) => {
    // 如果只剩下一个页面，不允许关闭
    if (this.openMenus.length === 1) {
      return;
    }
    const index = this.openMenus.findIndex((item) => item.path === menu.path);
    this.openMenus = this.openMenus.filter((item) => item !== menu);
    // 关闭的是当前激活的菜单
    if (this.activeMenu === menu.path) {
      if (this.openMenus.length > 0) {
        this.activeMenu = this.openMenus[index - 1].path;
      }
    }
  };
  getMenus = () => {
    return this.menus;
  };
  getItemByPath: (path: string) => Menu | undefined = (path: string) => {
    const findItem: (menus: Menu[]) => Menu | undefined = (menus) => {
      for (let i = 0; i < menus.length; i++) {
        const item = menus[i];
        if (item.path === path) {
          return item;
        }
        if (item.children) {
          const findChildren = findItem(item.children);
          if (findChildren) {
            return findChildren;
          }
        }
      }
    };
    return findItem(this.menus);
  };
}
const MenuStore = new Menustore();

export default MenuStore;
