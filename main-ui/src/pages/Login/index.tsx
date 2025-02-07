import UserStore from '@/store/User';
import LoginPage, {
  Username,
  Password,
  Submit,
  Title,
  Logo,
} from '@react-login-page/page1';
import { observer } from 'mobx-react-lite';

const styles = { height: '100%', width: '100%' };

const Login = observer(() => {
  return (
    <div style={styles}>
      <LoginPage>
        <Username placeholder="用户名" name="userUserName" />
        <Password placeholder="请输入密码" name="userPassword" />
        <Submit
          onClick={() => {
            UserStore.login({
              name: 'admin',
              password: 'admin',
            }).then(() => {
              // 刷新页面回到首页
              window.location.href = '/';
            });
          }}
        >
          登录
        </Submit>
        <Title />
        <Logo>登录</Logo>
      </LoginPage>
    </div>
  );
});

export default Login;
