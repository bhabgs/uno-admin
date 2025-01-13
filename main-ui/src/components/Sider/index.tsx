import { Layout, theme } from 'antd';

const { Sider } = Layout;

const SiderComonent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return <Sider width={200} style={{ background: colorBgContainer }}></Sider>;
};

export default SiderComonent;
