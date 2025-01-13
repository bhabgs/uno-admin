import { makeAutoObservable, set } from 'mobx';
import { preFetch } from '@micro-zoe/micro-app';
import { Store } from '.';

export interface AppInfo {
  appName: string;
  id: string;
  title: string;
  entry: string;
}

class AppStore {
  constructor(store: Store) {
    makeAutoObservable(this);
    this.store = store;
    // if (this.apps.length > 0) {
    //   this.setActiveApp(this.apps[0]);
    // }
  }
  store!: Store;
  apps: AppInfo[] = [
    {
      appName: 'react-app',
      id: 'react-app1',
      title: 'react-app1',
      entry: 'http://localhost:3001',
    },
    {
      appName: 'card-app',
      id: 'card-app',
      title: 'card-app',
      entry: 'http://localhost:3002',
    },
  ];

  // 当前活跃的应用
  activeApp: AppInfo | null = null;

  addApp(app: AppInfo) {
    this.apps.push(app);
    // 预加载
    preFetch([
      {
        name: app.appName,
        url: app.entry,
        iframe: true,
      },
    ]);
  }

  removeApp(app: AppInfo) {
    this.apps = this.apps.filter((a) => a !== app);
  }
  loadApp = () => {};

  setActiveApp = (app: AppInfo) => {
    this.activeApp = app;
  };

  setActiveAppByName = (appName: string) => {
    const app = this.apps.find((a) => a.appName === appName);
    if (app) {
      this.setActiveApp(app);
    }
  };

  get appCount() {
    return this.apps.length;
  }
}

export default AppStore;
