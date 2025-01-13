import { makeAutoObservable } from 'mobx';
import testData from './data';
import { Store } from '..';
import { generatePageId } from '@/utils';

export interface MenuInfo {
  appName: string;
  url: string;
  title: string;
  icon: string;
  id: string;
  isIframe?: boolean;
  openType: 'window' | 'tab';
  params?: Record<string, string>;
}

class MenuStore {
  constructor(store: Store) {
    makeAutoObservable(this);
    this.store = store;
    this.resetMenus(testData);
  }
  store!: Store;

  menus: MenuInfo[] = [];

  // 当前活跃的菜单
  activeMenu: MenuInfo | null = null;

  // 设置当前活跃的菜单
  setActiveMenu = (menu: MenuInfo) => {
    this.activeMenu = menu;

    // 查看是否已经打开过
    const tab = this.store.tabsStore.tabs.find(
      (a: { menuInfo: MenuInfo }) => a.menuInfo.id === menu.id,
    );

    if (tab) {
      this.store.tabsStore.setActiveTab(tab);
      return;
    }
    this.store.tabsStore.addTab({
      id: generatePageId(),
      menuInfo: menu,
    });
  };

  // 根据id设置当前活跃的菜单
  setActiveMenuByTagId = (id: string) => {
    const tab = this.store.tabsStore.tabs.find(
      (a: { id: string }) => a.id === id,
    );
    if (tab) {
      this.store.tabsStore.setActiveTab(tab);
      this.activeMenu = tab.menuInfo;
    }
  };

  setActiveMenuById = (id: string) => {
    const menu = this.menus.find((a) => a.id === id);
    if (menu) {
      this.setActiveMenu(menu);
    }
  };

  resetMenus = (menus: Array<MenuInfo>) => {
    this.menus = menus;
    this.setActiveMenu(menus[0]);
  };
}

export default MenuStore;
