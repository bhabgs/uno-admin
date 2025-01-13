import { Suspense } from 'react';
import { Layout } from 'antd';
import { RouterProvider } from 'react-router-dom';
import Header from '@/components/Header';
import SiderComonent from '@/components/Sider';
import Tab from '@/components/Tab';
import style from './index.module.less';

const App = (props: { routers: any }) => {
  const { routers } = props;
  return (
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
  );
};

export default App;
