import Login, { Render } from 'react-login-page';
import Logo from 'react-login-page/logo';

const LoginPage = () => {
  return (
    <Login>
      <Render>
        {({ fields, buttons, blocks, $$index }) => {
          return (
            <div>
              <header>
                {blocks.logo} {blocks.title}
              </header>
              <div>
                <label>{fields.username}</label>
              </div>
              <div>
                <label>{fields.password}</label>
              </div>
              <div>
                {buttons.submit}
                {buttons.reset}
              </div>
            </div>
          );
        }}
      </Render>
      <Login.Block keyname="logo" tagName="span">
        <Logo />
      </Login.Block>
      <Login.Block keyname="title" tagName="span">
        Login
      </Login.Block>
      <Login.Input keyname="username" placeholder="Please input Username" />
      <Login.Input keyname="password" placeholder="please enter password" />
      <Login.Button keyname="submit" type="submit">
        Submit
      </Login.Button>
      <Login.Button keyname="reset" type="reset">
        Reset
      </Login.Button>
    </Login>
  );
};
export default LoginPage;
