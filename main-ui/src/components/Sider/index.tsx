import { useSelfLocation } from '@/hooks/location';
import UserStore from '@/store/User';
import { MENU } from '@/store/User/dto/menu';
import { Layout, Menu, theme } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

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
  const nav = useNavigate();
  const { locationPath, setLocationPath } = useSelfLocation();
  return (
    <Sider width={200} style={{ background: colorBgContainer }}>
      {UserStore.user?.menu && (
        <Menu
          mode="inline"
          selectedKeys={[locationPath]}
          items={generateMenuItems(UserStore.user?.menu)}
          onClick={({ key }) => {
            nav(key);
            setLocationPath(key.toString());
          }}
        />
      )}
    </Sider>
  );
});

export default SiderComonent;
