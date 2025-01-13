import { Layout } from 'antd';
import Header from '@/components/Header';
import SiderComonent from '@/components/Sider';
import Tab from '@/components/Tab';
import Contentcomponent from '@/components/Content';

// fetch("/abc/").then((res) => {
//   res.text().then((data) => {
//     console.log(data);
//   });
// });

const App: React.FC = () => {
  return (
    <Layout id="layerBody">
      <Header />
      <Layout>
        <SiderComonent />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Tab />
          <Contentcomponent />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
