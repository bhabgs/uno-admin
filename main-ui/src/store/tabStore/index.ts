import { makeAutoObservable } from 'mobx';
import { unmountApp } from '@micro-zoe/micro-app';
import { Store } from '..';
import { MenuInfo } from '../Menu';
import { AppInfo } from '../apps';
import { generatePageId } from '@/utils';

interface tabInfo {
  menuInfo: MenuInfo;
  appInfo?: AppInfo;
  id: string;
}

class TabsStore {
  constructor(store: Store) {
    makeAutoObservable(this);
    this.store = store;
  }
  store!: Store;
  tabs: Array<tabInfo> = [];
  activeTab: tabInfo | null = null;
  addTab = (tab: { id: string; menuInfo: MenuInfo }) => {
    // 判断是否为iframe
    if (tab.menuInfo.isIframe) {
      this.addTabIframe(tab);
      return;
    }
    // 根据menuInfo中的appName，找到对应的appInfo
    const appInfo = this.store.appStore.apps.find(
      (a) => a.appName === tab.menuInfo.appName,
    );

    if (!appInfo) {
      return;
    }

    const tabInfo = {
      ...tab,
      appInfo,
      id: 'micro-' + generatePageId(),
    };

    this.setActiveTab(tabInfo);

    // 如果已经存在，则不添加
    if (this.tabs.find((a) => a.id === tab.id)) {
      return;
    }
    this.tabs.push(tabInfo);
  };
  addTabIframe = (tab: { id: string; menuInfo: MenuInfo }) => {
    const tabInfo = {
      ...tab,
    };

    if (tabInfo.menuInfo.openType === 'window') {
      this.openNewWindow(tabInfo);
      return;
    }
    this.setActiveTab(tabInfo);

    // 如果已经存在，则不添加
    if (this.tabs.find((a) => a.id === tab.id)) {
      return;
    }
    this.tabs.push(tabInfo);
  };
  removeTab = (tab: tabInfo) => {
    this.tabs = this.tabs.filter((a) => a !== tab);
    this.store.menuStore.setActiveMenuByTagId(this.tabs[0].id);
    setTimeout(() => {
      unmountApp(tab.id).then(() => {
        document.getElementById(tab.id)?.remove();
        this.store.menuStore.setActiveMenuByTagId(this.tabs[0].id);
      });
    }, 100);
  };
  removeTabById = (id: string) => {
    const tab = this.tabs.find((a) => a.id === id);
    if (tab) {
      this.removeTab(tab);
    }
  };
  setActiveTab = (tab: tabInfo) => {
    // 切换应用
    this.activeTab = tab;
    this.store.appStore.setActiveAppByName(tab.menuInfo.appName);
  };

  getTabById = (id: string) => {
    return this.tabs.find((a) => a.id === id);
  };

  createCustomTab = (data: {
    url: string;
    title: string;
    params: Record<string, string>;
  }) => {
    const { url, title, params } = data;

    // 如果已经存在，则不添加
    const findtab = this.tabs.find((a) => a.menuInfo.url === url);
    if (findtab) {
      this.setActiveTab(findtab);
      return;
    }
    const tab: tabInfo = {
      id: generatePageId(),
      menuInfo: {
        appName: this.activeTab?.appInfo?.appName || '',
        url,
        title,
        icon: 'icon-react',
        id: generatePageId(),
        params,
        openType: 'tab',
      },
    };
    this.addTab(tab);
    // this.setActiveTab(tab);
  };

  openNewWindow = (tab: tabInfo) => {
    const newWindow = window.open(tab.menuInfo.url, tab.menuInfo.appName);
    if (newWindow) {
      console.log('New window opened!');
    } else {
      console.error('Failed to open new window.');
    }
  };
}

export default TabsStore;
