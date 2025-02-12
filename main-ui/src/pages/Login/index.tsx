import UserStore from '@/store/User';
import { observer } from 'mobx-react-lite';
import LoginImg from '@/assets/login.png';

import LoginPage, {
  Logo,
  Banner,
  ButtonAfter,
  Password,
  Input,
  Title,
  Email,
  Submit,
} from '@react-login-page/page2';
import { useNavigate } from 'react-router-dom';

const Login = observer(() => {
  const nav = useNavigate();
  return (
    <LoginPage style={{ height: 580 }}>
      <Input placeholder="用户名" name="userUserName" />
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
      <Email type="text" placeholder="邮箱" visible={false} />
      <Title visible={false} />
      <Logo>登录</Logo>
      <Banner>
        <img src={LoginImg} style={{ width: 316, height: 289 }} />
      </Banner>
      <ButtonAfter>
        <a
          onClick={() => {
            nav('/register');
          }}
        >
          去注册
        </a>
      </ButtonAfter>
    </LoginPage>
  );
});

export default Login;
