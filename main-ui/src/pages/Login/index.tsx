import { Form, Input, Button } from 'antd';
import style from '../Register/index.module.less';
import { login } from '@/remote/User';

const Reginter = () => {
  const [form] = Form.useForm();
  return (
    <div className={style.body}>
      <div className={style.box}>
        <div className={style.banner}></div>
        <div className={style.form}>
          <div className={style.title}>uno-admin 登录</div>
          <Form
            form={form}
            className={style.formComponent}
            onFinish={(v) => {
              console.log(v);

              login(v);
            }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
          >
            <Form.Item
              name="username"
              required
              label="用户名"
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 4, message: '用户名最少4位' },
                { max: 16, message: '用户名最多16位' },
              ]}
            >
              <Input type="text" placeholder="手机号/邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              required
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 8, message: '密码最少8位' },
                { max: 16, message: '密码最多16位' },
              ]}
            >
              <Input type="password" placeholder="密码" />
            </Form.Item>

            <Form.Item label=" " colon={false}>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Reginter;
