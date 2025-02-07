import UserStore from '@/store/User';
import { MENU } from '@/store/User/dto/menu';
import { Layout, Menu, theme } from 'antd';
import { observer } from 'mobx-react-lite';

const { Sider } = Layout;

const generateMenuItems = (menuItems: MENU[]): any => {
  return menuItems.map((item) => {
    if (item.children && item.children.length > 0) {
      return {
        key: item.path.toString(),
        label: item.name,
        children: generateMenuItems(item.children),
      };
    }
    return {
      key: item.path.toString(),
      label: item.name,
    };
  });
};

const SiderComonent = observer(() => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Sider width={200} style={{ background: colorBgContainer }}>
      {UserStore.user?.menu && (
        <Menu mode="inline" items={generateMenuItems(UserStore.user?.menu)} />
      )}
    </Sider>
  );
});

export default SiderComonent;
