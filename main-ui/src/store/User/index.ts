import { makeAutoObservable } from 'mobx';
import FeatureRouters, { SelfRouteObject } from '@/router/feature';
import { AuthRouters } from '@/router';
import { login } from '@/remote/User';
import { MENU } from '@/remote/Menu/menu.dto';
import { USER } from '@/remote/User/user.dto';

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
    return this.user?.access_token;
  }
  // 登录
  login = async (user: { username: string; password: string }) => {
    try {
      const res = await login(user);
      console.log(res.data);

      this.setUser(res.data);
      return Promise.resolve({
        type: true,
        message: '登录成功',
      });
    } catch (error) {
      return Promise.reject({
        type: false,
        message: error,
      });
    }
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
