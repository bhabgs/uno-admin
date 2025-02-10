import { Suspense } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import ThemeStore from '@/store/Theme';
import Header from '@/components/Header';
import SiderComonent from '@/components/Sider';
import Tab from '@/components/Tab';
import style from './index.module.less';

const App = observer(() => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: ThemeStore.colorPrimary,
          borderRadius: ThemeStore.borderRadius,
        },
      }}
    >
      <Layout className={style.layerBody}>
        <Header />
        <Layout>
          <SiderComonent />
          <Layout>
            <Tab />
            <div className={style.routerBox}>
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </div>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
});

export default App;
