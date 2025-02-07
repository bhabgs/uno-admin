import { Suspense } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { observer } from 'mobx-react-lite';
import { RouterProvider } from 'react-router-dom';
import ThemeStore from '@/store/Theme';
import Header from '@/components/Header';
import SiderComonent from '@/components/Sider';
import Tab from '@/components/Tab';
import style from './index.module.less';

const App = observer((props: { routers: any }) => {
  const { routers } = props;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: ThemeStore.colorPrimary,
          borderRadius: ThemeStore.borderRadius,
        },
      }}
    >
      <Layout id="layerBody">
        <Header />
        <Layout>
          <SiderComonent />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Tab />
            <div className={style.routerBox}>
              <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={routers} />
              </Suspense>
            </div>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
});

export default App;
