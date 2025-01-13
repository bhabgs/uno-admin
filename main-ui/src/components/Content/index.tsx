import { Layout, theme } from 'antd';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import styles from './index.module.less';

const { Content } = Layout;

const ContentComponent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { activeApp } = store.appStore;
  const { activeTab, tabs } = store.tabsStore;

  return (
    <Content
      style={{
        padding: 12,
        margin: 0,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        overflow: 'hidden',
        overflowY: 'auto',
        display: 'flex',
      }}
    >
      {!activeTab?.menuInfo.isIframe && (
        <micro-app
          name={activeTab?.id}
          url={`${activeApp?.entry}${activeTab?.menuInfo.url}`}
          class={styles.iframeMicroApp}
          iframe
          keep-alive
          keep-router-state
          fiber
        ></micro-app>
      )}
      {tabs.map((tab) => {
        if (!tab.menuInfo.isIframe) return null;
        return (
          <iframe
            className={styles.iframeMicroApp}
            src={tab?.menuInfo.url}
            style={{ display: activeTab?.id === tab.id ? 'block' : 'none' }}
          />
        );
      })}
    </Content>
  );
};

export default observer(ContentComponent);
