import LoginPage, {
  Logo,
  Email,
  Banner,
  ButtonAfter,
  Password,
  Input,
  Title,
  Submit,
} from '@react-login-page/page2';
import LoginLogo from 'react-login-page/logo-rect';
import defaultBannerImage from '@react-login-page/page2/banner-image';

const Demo = () => (
  <LoginPage style={{ height: 580 }}>
    <Logo>
      <LoginLogo />
    </Logo>
    <Title>注册</Title>
    <Input name="phone" index={1} placeholder="手机号">
      <div>ip</div>
    </Input>
    <Password index={2} placeholder="密码" />
    <Email index={3} type="text" placeholder="邮箱" />
    <Submit>提交</Submit>
    <Banner>
      <img src={defaultBannerImage} />
    </Banner>
    <ButtonAfter>
      <a href="#">已有账号去登录?</a>
    </ButtonAfter>
  </LoginPage>
);

export default Demo;
