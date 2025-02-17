import { Layout, ColorPicker, Button } from 'antd';
import ThemeStore from '@/store/Theme';
import { observer } from 'mobx-react-lite';
import { HighlightOutlined } from '@ant-design/icons';
import { throttle } from '@/utils';
import style from './index.module.less';

const { Header } = Layout;
const HeaderComonent = observer(() => {
  const { setThemeColor, headerBackground } = ThemeStore;
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 0,
        background: headerBackground,
      }}
    >
      <div className={style.logo}>UNO ADMIN</div>

      <div>
        <ColorPicker
          onChange={throttle((color) => {
            setThemeColor(color.toHexString());
          }, 100)}
        >
          <Button type="dashed" size="small" icon={<HighlightOutlined />} />
        </ColorPicker>
      </div>
    </Header>
  );
});

export default HeaderComonent;
