import { makeAutoObservable } from 'mobx';
import FeatureRouters, { SelfRouteObject } from '@/router/feature';
import { USER } from './dto';
import { AuthRouters } from '@/router';
import { MENU } from './dto/menu';

class User {
  constructor() {
    makeAutoObservable(this);
    this.getUser();
  }
  user: USER | null = null;

  private fomatRouters: (defaultRouters: Array<SelfRouteObject>) => MENU[] = (
    router,
  ) => {
    const menu: MENU[] = [];
    router.forEach((item) => {
      if (item.children) {
        menu.push({
          name: item.name!,
          id: item.path,
          path: item.path!,
        });
        this.fomatRouters(item.children);
      }
    });
    return menu;
  };

  private setUser = (user: USER) => {
    // 防止刷新页面数据丢失
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  };
  private getUser = () => {
    const user = localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
    }
    if (this.user?.role === 'admin') {
      const routers = this.fomatRouters(FeatureRouters);
      this.user.menu = routers;
    }
  };

  clearUser = () => {
    this.user = null;
  };

  get isLogin() {
    return !!this.user;
  }

  get token() {
    return this.user?.token;
  }
  // 登录
  login = async (user: { name: string; password: string }) => {
    // 实际对接需要改造 默认admin为管理员拥有所有权限
    if (user.name === 'admin' && user.password === 'admin') {
      this.setUser({
        token: 'token',
        role: 'admin',
        id: 1,
        info: {},
      });
      return Promise.resolve({
        type: true,
      });
    }
    return Promise.reject({
      type: false,
    });
  };

  // 验证token
  checkToken = async () => {
    if (!this.token) {
      return {
        newRouters: AuthRouters(),
        type: false,
      };
    }
    // 验证token
    return {
      newRouters: AuthRouters(this.user!),
      type: true,
    };
  };
}
const UserStore = new User();
export default UserStore;
