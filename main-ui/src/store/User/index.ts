import { makeAutoObservable } from 'mobx';
import { USER } from './dto';

class User {
  constructor() {
    makeAutoObservable(this);
  }
  user: USER | null = null;

  setUser = (user: USER) => {
    this.user = user;
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
}
const UserStore = new User();
export default UserStore;
