import { observer } from 'mobx-react-lite';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelfLocation } from '@/hooks/location';
import MenuStore from '@/store/Menu';
import { Menu as MenyType } from '@/store/Menu/menu.dto';

const { Sider } = Layout;

const generateMenuItems = (menuItems: MenyType[]): any => {
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
  const items = generateMenuItems(MenuStore.menus);
  return (
    <Sider width={200} style={{ background: colorBgContainer }}>
      {MenuStore.menus && (
        <Menu
          mode="inline"
          selectedKeys={[locationPath]}
          items={items}
          onClick={({ key }) => {
            const item = MenuStore.getItemByPath(key.toString());
            MenuStore.openMenu(item!);
            setLocationPath(key.toString());
            // nav(key);
          }}
        />
      )}
    </Sider>
  );
});

export default SiderComonent;
