import { Form, Input, Button } from 'antd';
import style from './index.module.less';
import { createUser, getUsers } from '@/remote/User';

const Reginter = () => {
  const [form] = Form.useForm();
  return (
    <div className={style.body}>
      <div className={style.box}>
        <div className={style.banner}></div>
        <div className={style.form}>
          <div className={style.title}>uno-admin 注册</div>
          <Form
            form={form}
            className={style.formComponent}
            onFinish={(v) => {
              console.log(v);
              delete v.passwordconfirm;
              createUser(v);
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
              <Input type="text" placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              required
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 8, message: '密码最少8位' },
                { max: 16, message: '密码最多16位' },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,16}$/,
                  message: '密码必须包含数字、字母、特殊字符',
                },
              ]}
            >
              <Input type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="passwordconfirm"
              required
              rules={[
                { required: true, message: '请输入确认密码' },
                { min: 8, message: '密码最少8位' },
                { max: 16, message: '密码最多16位' },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,16}$/,
                  message: '密码必须包含数字、字母、特殊字符',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次密码不一致');
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="确认密码" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' },
              ]}
            >
              <Input type="text" placeholder="手机号" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                注册
              </Button>
              <Button
                type="primary"
                block
                onClick={() => {
                  getUsers();
                }}
              >
                huoqu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Reginter;
