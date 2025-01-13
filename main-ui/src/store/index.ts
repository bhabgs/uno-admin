import { makeAutoObservable } from 'mobx';
import AppStore from './apps';
import TabsStore from './tabStore';
import MenuStore from './Menu';

export class Store {
  constructor() {
    makeAutoObservable(this);
  }
  appStore: AppStore = new AppStore(this);
  tabsStore: TabsStore = new TabsStore(this);
  menuStore: MenuStore = new MenuStore(this);
}

const store = new Store();

export default store;
