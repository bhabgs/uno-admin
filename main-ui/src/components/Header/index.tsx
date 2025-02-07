import { Layout, Button, ColorPicker } from 'antd';
import ThemeStore from '@/store/theme';
import { observer } from 'mobx-react-lite';
import { throttle } from '@/utils';

const { Header } = Layout;
const HeaderComonent = observer(() => {
  const { setThemeColor } = ThemeStore;
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Button type="primary">Primary Button</Button>
      <ColorPicker
        onChange={throttle((color) => {
          setThemeColor(color.toHexString());
        }, 100)}
      >
        <Button type="primary">修改主色</Button>
      </ColorPicker>
    </Header>
  );
});

export default HeaderComonent;
